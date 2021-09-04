
import{useHistory, useParams}   from 'react-router-dom'
import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import deleteImg from '../assets/images/delete.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/roomCode';
//import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';




type RooParams ={
    id:string;
}

export function AdminRoom(){
    //const {user} = useAuth();
    const history = useHistory();
    const params = useParams<RooParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId)

    async   function handleEndRoom() {
      await  database.ref(`rooms/${roomId}`).update({
          endedAt: new Date(),
      })
      history.push('/');
    }

  async  function handeleDeleteQuestions(questionId:string){
      if (window.confirm('Tem certeza que voce deseja excluir esta pergunta')){
       await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      }
    }

    async function  handeleChecQuestionsAsAnswerd(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered:true,
        });
    }

    async function handeleHigLightQuestion(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted:true,
        });
    }
   

    return (
      <div id="page-room">
          <header>
              <div className="content">
              <img src={logoImg} alt="letmask"/>
            <div>
            <RoomCode code={roomId}/>
              <Button isOutlined onClick={handleEndRoom}>Encerar sala</Button>
            </div>
              </div>
          </header>

          <main >
              <div className="room-title">
                  <h1>Sala {title}</h1>
                 {questions.length > 0 &&  <span>{questions.length} perguntas</span>}
              </div>

              <div className="question-list">
          {questions.map(question => {
                return (
                    <Question 
                    key={question.id}
                    content={question.content}
                    author={question.author}
                    isAnswered={question.isHighlighted}
                    isHighlighted={question.isHighlighted}

                    >
                        {!question.isAnswered && (
                            <>
                            <button
                            type="button"
                            onClick={() => handeleChecQuestionsAsAnswerd(question.id)}
                            >
                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                            </button>
                            <button
                            type="button"
                            onClick={() => handeleHigLightQuestion(question.id)}
                            >
                                <img src={answerImg} alt="Dar destaque a pergunta" />
                            </button>
                            </>
                        )}
                        <button
                        type="button"
                        onClick={() => handeleDeleteQuestions(question.id)}
                        >
                            <img src={deleteImg} alt="Remover pergunta" />
                        </button>
                </Question>
                );
            })}
          </div>
          </main>
          
      </div>
    );
}