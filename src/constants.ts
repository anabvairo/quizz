import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'O que define o Design Responsivo?',
    type: 'single',
    options: [
      { id: '1', text: 'Adaptação a diferentes tamanhos de tela', isCorrect: true },
      { id: '2', text: 'Uso exclusivo de cores vibrantes', isCorrect: false },
      { id: '3', text: 'Layout fixo para desktops', isCorrect: false },
    ],
    correctFeedback: 'Isso mesmo! O design responsivo permite que o site se adapte a qualquer dispositivo.',
    incorrectFeedback: 'Não exatamente. O foco do design responsivo é a adaptabilidade de tela.',
  },
  {
    id: 'q2',
    question: 'Perante esta violação de dados, que danos podem ocorrer? Escolha as opções corretas. Pode existir mais do que uma resposta certa.',
    type: 'multiple',
    options: [
      { id: 'a', text: 'danos à reputação da organização', isCorrect: true },
      { id: 'b', text: 'discriminação ou exposição indevida do titular', isCorrect: true },
      { id: 'c', text: 'fraude com dados pessoais', isCorrect: true },
      { id: 'd', text: 'usurpação ou roubo de identidade', isCorrect: true },
      { id: 'e', text: 'ausência de risco ou dano relevante', isCorrect: false },
    ],
    correctFeedback: 'Exatamente. A exposição indevida de dados pessoais e sensíveis pode gerar impactos severos para os titulares e para a organização, incluindo danos reputacionais, riscos financeiros e sanções.',
    incorrectFeedback: 'Reveja o caso. Quando dados sensíveis e bancários são expostos, não se trata de uma situação sem relevância. Os riscos são concretos e significativos.',
  },
  {
    id: 'q3',
    question: 'Qual a principal finalidade da LGPD?',
    type: 'single',
    options: [
      { id: 'x', text: 'Proteger os direitos fundamentais de liberdade e de privacidade', isCorrect: true },
      { id: 'y', text: 'Impedir qualquer tipo de tratamento de dados', isCorrect: false },
      { id: 'z', text: 'Apenas aplicar multas às empresas', isCorrect: false },
    ],
    correctFeedback: 'Correto! A LGPD visa proteger a privacidade e a liberdade do indivíduo.',
    incorrectFeedback: 'Incorreto. A LGPD não proíbe o tratamento, mas o regulamenta para proteger o titular.',
  },
];
