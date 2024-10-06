import React from "react";
import { FaUser, FaTools, FaRocket, FaGithub, FaEnvelope, FaReact, FaNode, FaDatabase, FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaServer, FaMailBulk } from 'react-icons/fa';
import { useSelector } from "react-redux";


const About = () => {

  const mode = useSelector(state=>state.mode);
  let fontColor = mode === 'light' ? 'black' : 'white';
  
  return (
    <div className="container my-5" style={{color : fontColor}}>
      <h1 className="text-center mb-4">About Us</h1>

      {/* Project Overview */}
      <section id="overview" className="mb-5">
        <h2 className="my-3">Project Overview</h2>
        <p>
        This project is a dynamic note-taking application that allows users to manage their notes efficiently. It features a user-friendly interface where users can add, update, and edit their notes seamlessly.
        The project aims to provide a simple yet powerful tool for note-taking, emphasizing ease of use and accessibility for all users.

        </p>
      </section>

    <div className="card mb-4" style={{padding : '10px'}}>      
      <h2 className="card-title my-3">
        <FaUser /> Who Am I?
      </h2>
      <p className="card-text" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
        I am a passionate developer dedicated to creating intuitive and user-friendly web applications. With a focus on enhancing user experience, I strive to build solutions that are both functional and aesthetically pleasing. As the sole developer of this project, I handle everything from front-end design to back-end functionality, ensuring that every aspect of the application aligns with my vision of simplicity and efficiency. My goal is to empower users with tools that streamline their daily tasks, making their lives easier and more organized.
      </p>
    </div>
    
      <div className="container mt-5">
      <h1 className="text-center mb-4">About This Project</h1>

      {/* Features */}
      <section id="features" className="mb-5">
        <h2 className="my-3">Features</h2>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                User Authentication
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>Secure Login and Logout</strong> User Authentication ensures that only authorized individuals can access their accounts and personal notes. The system utilizes secure login and logout functionalities, requiring users to enter their credentials (email address and password) to gain access. This process protects sensitive information and maintains user privacy, allowing users to manage their notes securely.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Comprehensive Note Management
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              <ul>
                <li><strong>Add Notes:</strong> Quickly create new notes with ease.</li>
                <li><strong>Edit Notes:</strong> Modify existing notes to keep your information current.</li>
                <li><strong>Delete Notes:</strong> Easily remove notes that are no longer needed.</li>
                <li><strong>Read Notes:</strong> View all your notes in a clear and organized manner.</li>
             </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Note Summarization
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>Summarization</strong> This feature allows users to efficiently condense lengthy notes into concise summaries, highlighting the essential information and key points. With the Help of apyhub I have used the api of Text Summarizer api to summarize the user's note ensuring that users can quickly grasp the main ideas without having to read through the entire note. This functionality enhances productivity by enabling users to manage their information more effectively.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Text Utilities
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              <ul>
                  <li><strong>Word Count:</strong> Instantly view the word count of your notes for quick analysis.</li>
                  <li><strong>Clear Spaces:</strong> Remove unnecessary spaces in your text for cleaner formatting.</li>
                  <li><strong>Clear Text:</strong> Easily delete all content from a note when starting fresh.</li>
                  <li><strong>Copy Functionality:</strong> Quickly copy note content to your clipboard for easy sharing or reuse.</li>
              </ul>

              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title"><FaRocket /> Project Goals</h2>
          <section id="project-goals" className="mb-5 my-3">
            <ul>
              <li className="my-2"><strong>User-Centric Design:</strong> To create an intuitive and engaging user interface that enhances the note-taking experience.</li>
              <li className="my-2"><strong>Seamless Functionality:</strong> Ensure smooth performance with efficient features for adding, updating, deleting, and summarizing notes.</li>
              <li className="my-2"><strong>Robust Security:</strong> Implement secure user authentication to protect personal information and notes.</li>
              <li className="my-2"><strong>Text Utility Features:</strong> Offer essential text utilities like word count and clear text to assist users in managing their notes effectively.</li>
              <li className="my-2"><strong>Accessibility:</strong> Make the application easily accessible across devices, enabling users to manage their notes anywhere, anytime.</li>
            </ul>
          </section>
        </div>
      </div>




      <div className=" mb-4">
        <div className="card-body">
          <h2 className="card-title my-3"><FaTools /> Technologies Used</h2>
          
          
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <FaReact size={50} className="mb-2" />
                  <h5 className="card-title">React</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <FaNode size={50} className="mb-2" />
                  <h5 className="card-title">Node.js</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <FaDatabase size={50} className="mb-2" />
                  <h5 className="card-title">MongoDB</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <FaServer size={50} className="mb-2" />
                  <h5 className="card-title">Express</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <FaHtml5 size={50} className="mb-2" />
                  <h5 className="card-title">HTML5</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <FaCss3Alt size={50} className="mb-2" />
                  <h5 className="card-title">CSS3</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <FaJsSquare size={50} className="mb-2" />
                  <h5 className="card-title">JavaScript</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <FaBootstrap size={50} className="mb-2" />
                  <h5 className="card-title">Bootstrap</h5>
                </div>
              </div>
            </div>
          </div>




        </div>
      </div>

      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title"><FaEnvelope /> Contact</h2>
            <p className="card-text">
              If you have any questions or feedback, feel free to reach out!
            </p>

          <div style={{display:'flex'}}>
          <FaMailBulk size={30} className="mb-2 mx-3" />
            <p className="card-text">
              Email: <a href="sudharsanvenkataraman74@gmail.com">sudharsanvenkataraman74@gmail.com</a>
            </p>
          </div>

          <div className="" style={{display : 'flex'}}>
          <FaGithub size={30} className="mb-2 mx-3" />
          <p className="card-text">
          GitHub: <a href="https://github.com/Sudharsan278" target="_blank" rel="noopener noreferrer">Sudharsan278</a>
          </p>
          </div>

        </div>
      </div>
    </div>

    </div>
  );
};

export default About;
