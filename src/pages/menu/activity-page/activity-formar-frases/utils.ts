import Swal from "sweetalert2";
import { TextToSpeech } from "../../../../services/voice/voice-service";

export const errorAlert = () => {
    const speech: TextToSpeech = new TextToSpeech();
  
    Swal.fire({
        icon: 'error',
        title: 'Resposta Incorreta!',
        text: '',
        confirmButtonColor: '#508E92'
    }).then((result: any) => {
        if(result.isConfirmed) {
          speech.textToSpeech('Resposta Incorreta!');
        }
    })
}

export const successAlert = () => {
    const speech: TextToSpeech = new TextToSpeech();
    speech.textToSpeech('Parabéns, você acertou!!');
  
    Swal.fire({
        icon: 'success',
        title: 'Parabéns, você acertou!!',
        text: '',
        confirmButtonColor: '#508E92',
        timer: 1000
    });
}