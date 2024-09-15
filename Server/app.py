from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
from werkzeug.utils import secure_filename
import os
from ultralytics import YOLO
import cv2

app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = '../Client/public/static'
OUTPUT_FOLDER = '../Client/public/runs'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER
app.config['MAX_CONTEXT_LENGTH'] = 16 * 1024 * 1024

if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)

model = YOLO('Models/sku110k_15_epochs.pt')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower()

def predict(model, source):
    prediction = model.predict(source=source)
    return prediction

def count(results):
    for result in results:
        box = result.boxes
    return len(box)

def draw_bounding_boxes(image, results):
    for result in results:
        if result.boxes is not None:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist()) 
                label = result.names[int(box.cls[0])]  
                confidence = box.conf[0].item()

                cv2.rectangle(image, (x1, y1), (x2, y2), color=(0, 255, 0), thickness=5)
                
                cv2.putText(image, f"{label} {confidence:.2f}", (x1, y1 - 10), 
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    return image


@app.route("/")
def hello_world():
    return "Homepage"

@app.route('/upload', methods=['POST'])
def upload_file():
    # if request.method == 'POST':
        if 'files[]' not in request.files:
            resp = jsonify({
                "message": 'No file part in the request',
                "status": 'failed'
            })
            resp.status_code = 400
            return resp
        
        files = request.files.getlist('files[]')

        errors = {}
        success = False
        results = [] 

        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                success = True

                image = cv2.imread(filepath)
                if image is None:
                    resp = jsonify({
                        "message" : 'File could not be read',
                        "status": 'failed'
                    })
                    continue

                result = predict(model, image)
                totalCount = count(result)
                processedImage = draw_bounding_boxes(image, result)
                processedImagePath = os.path.join(app.config['OUTPUT_FOLDER'], f"processed_{filename}")
                cv2.imwrite(processedImagePath, processedImage)

                results.append({
                    "filename": filename,
                    "count": totalCount,
                    "status": 'Processed',
                })

            else:
                resp = jsonify({
                    "message" : 'File type not allowed',
                    "status": 'failed'
                })
                return resp
            
        if success and errors:
            errors['message'] = 'File(s) successfully uploaded'
            errors['status'] = 'failed'
            resp=jsonify(errors)
            resp.status_code = 500
            return resp
        
        if success:
            resp = jsonify({
                "message": 'Files sucessfully uploaded',
                "status": 'success',
                "results": results
            })
            print(results)
            resp.status_code = 201
            return resp
        else:
            resp = jsonify(errors)
            resp.status_code = 500
            return resp

@app.route('/predict', methods=['GET'])
def process_image():
    pass
if __name__ == '__main__':
    app.run(debug=True)

