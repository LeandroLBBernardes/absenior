import Swal from 'sweetalert2';
import { TextToSpeech } from '../../services/voice/voice-service';

export const validateNameNotEmpty = (name: string) => {
  if(name.length == 0 || name == undefined) {
    const text: string = "O campo de nome não pode ser vazio.";
    errorAlert(text);
    return false;
  }

  return true;
}

export const validateEmailNotEmpty = (email: string) => {
  if(email.length == 0 || email == undefined) {
    const text: string = "O campo de email não pode ser vazio.";
    errorAlert(text);
    return false;
  }

  return true;
}

const errorAlert = (text: string) => {
  const speech: TextToSpeech = new TextToSpeech();

  Swal.fire({
      icon: 'error',
      title: 'Erro ao salvar!',
      text: text,
      confirmButtonColor: '#508E92'
  }).then((result: any) => {
      if(result.isConfirmed) {
        speech.textToSpeech(text);
      }
  })
}