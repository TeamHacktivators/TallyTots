import styles from './Team.module.css';
import tuhsar from "../../assets/img/tushar.jpg"
import vedant from "../../assets/img/vedie2.jpeg"
import sumit from "../../assets/img/unnamed.jpg"

const teamMembers = [
  {
    name: 'Vedant Sudhir Patil',
    role: 'AI/ML Engineer',
    punchline: 'Teaching machines to think they are humans. Success rate: 30%.',
    linkedin: 'https://www.linkedin.com/in/vedantspatil/',
    image: vedant 
  },
  {
    name: 'Sumit Grover',
    role: 'Full Stack Developer',
    punchline: 'Can code a full stack quickly but will debug it for days!',
    linkedin: 'https://www.linkedin.com/in/sumit-grover-29a277256/',
    image: sumit
  },
  {
    name: 'Tushar Malhan',
    role: 'Full Stack Developer',
    punchline: 'Writes code so clean it makes it difficult even for the vacuum cleaner.',
    linkedin: 'https://www.linkedin.com/in/tushar-malhan-9998ab256/',
    image: tuhsar 
  }
];

function Team() {
  return (
    <section className={styles.teamContainer}>
      <h1 className={styles.heading}>Our Team</h1>
      <p className={styles.description}>
        This web app is built by a very unprofessional and lazy team of developers.
      </p>
      <div className={styles.grid}>
        {teamMembers.map(member => (
          <div key={member.name} className={styles.card}>
            <img src={member.image} alt={member.name} className={styles.image} />
            <h2 className={styles.name}>{member.name}</h2>
            <p className={styles.punchline}>{member.punchline}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedin}>
              LinkedIn
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
