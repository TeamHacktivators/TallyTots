import { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

function ImageUpload() {
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [responseMsg, setResponseMsg] = useState({
      status: "",
      message: "",
      error: "",
    });
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const handleChange = (e) => {
      const imagesArray = [];
      for (let i = 0; i < e.target.files.length; i++) {
        fileValidate(e.target.files[i]);
        imagesArray.push(e.target.files[i]);
      }
      setImages(imagesArray);
    };

    const submitHandler = (e) => {
      e.preventDefault();
      console.log("Image being processed ...");
      const data = new FormData();
      for (let i = 0; i < images.length; i++) {
        data.append("files[]", images[i]);
      }

      axios
        .post("https://99ad9257-e50e-43a3-a311-f5b65e329622-00-3vpdxbgii6bmk.sisko.replit.dev/upload", data)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            setResponseMsg({
              status: response.data.status,
              message: response.data.message,
            });
            setResults(response.data.results);

            setTimeout(() => {
              setImages([]);
              setResponseMsg({
                status: "",
                message: "",
                error: "",
              });
            }, 10000);

            document.querySelector("#imageForm").reset();
            alert("Successfully uploaded");
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            console.log(error.response);
            if (error.response.status === 401) {
              alert("Invalid credentials");
            }
          }
        });
    };

    const fileValidate = (file) => {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      ) {
        setResponseMsg({
          ...responseMsg,
          error: "",
        });
        return false;
      }
    };

    const handleImageClick = (imageSrc) => {
      setFullscreenImage(imageSrc);
    };

    const closeFullscreen = () => {
      setFullscreenImage(null);
    };

    return (
      <>
        <section id={styles.testingContainer}>
          <div id={styles.testingHeading}>
            <h1>Test our model</h1>
          </div>
          <div id={styles.stepsList}>
            <h3>Steps to follow :-</h3>
            <ol id={styles.steps}>
              <li>Select the desired inventory image from the choose image button below.</li>
              <li>After selecting the correct image, upload the image by clicking on upload button.</li>
              <li>Wait for the model to complete the processing.</li>
              <li>The desired count is displayed on the screen.</li>
            </ol>
          </div>
          <form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            id="imageForm"
            className={styles.uploadForm}
          >
            <div className={styles.uploadContainer}>
              <label htmlFor="images" className={styles.uploadLabel}>
                <span>Choose Image</span>
                <i className={`${styles.uploadIcon} fa-regular fa-image`}></i>
              </label>
              <input
                id="images"
                type="file"
                name="image"
                multiple
                onChange={handleChange}
                className={styles.fileInput}
              />
              <button type="submit" className={styles.uploadButton}>
                <span>Upload</span>
                <i className="fa-solid fa-cloud-arrow-up"></i>
              </button>
            </div>
          </form>

          {/* Display Results */}
          <div id={styles.resultContainer}>
            <h2>Results:</h2>
            <table className={styles.resultsTable}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className={styles.imageCell}>
                      <div className={styles.imageWrapper}>
                        <img
                          src={`/runs/processed_${result.filename}`}
                          alt="processed"
                          className={styles.processedImage}
                          onClick={() => handleImageClick(`/runs/processed_${result.filename}`)}
                        />
                        <i
                          className={`${styles.fullscreenIcon} fa-solid fa-expand`}
                          onClick={() => handleImageClick(`/runs/processed_${result.filename}`)}
                        ></i>
                      </div>
                    </td>
                    <td>{result.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {fullscreenImage && (
            <div className={styles.fullscreenModal} onClick={closeFullscreen}>
              <span className={styles.closeButton} onClick={closeFullscreen}>
                &times;
              </span>
              <img src={fullscreenImage} alt="Fullscreen" className={styles.fullscreenImage} />
            </div>
          )}
        </section>
      </>
    );
}

export default ImageUpload;
