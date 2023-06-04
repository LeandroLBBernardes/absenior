import Swal from 'sweetalert2';
import { TextToSpeech } from '../../services/voice/voice-service';

export const validateSamePassword = (password: string, newPassword: string) => {
  if(!(password === newPassword)) {
    const text: string = "As duas senhas devem ser iguais.";
    errorAlert(text);
    return false;
  }

  return true;
}

export const validateLengthPassword = (password: string) => {
  if(!(password.length >= 6)) {
    const text: string = "A senha deve possuir no mínimo 6 caracteres";
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

export const sucessAlert = () => {
  const title: string = 'Sucesso';
  const text: string = 'Senha alterada';
  const speech: TextToSpeech = new TextToSpeech();

  Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonColor: '#508E92'
  }).then ((result: any) => {
      if(result.isConfirmed)
          speech.textToSpeech(text);
  });
}
