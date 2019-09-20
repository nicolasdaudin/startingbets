export const JOURNEY_PROGRAM_TYPES = [
  {type:'350-FR',label:'Programme France 350 euros 🇫🇷',default_goal:350},
  {type:'400-BE',label:'Programme Belgique 400 euros 🇧🇪',default_goal:400},
  {type:'400-ES',label:'Programme Espagne 400 euros 🇪🇸',default_goal:400}
]


export const USER_ACTIONS = [
  {type:'simple',label:"Simple message",default_msg:"Ceci est un simple message..."}, // default message
  {type:'bet',label:"Prise de paris",default_msg:
`Bonjour,

Merci. Voici un nouveau pari à effectuer avec les informations suivantes:

Date : 
Sport : 
Pays : 
Ligue : 
Match : 
Mise 1 : 
Mise 2 : 
Mise 3 : 

Si vous avez un doute, répondez à ce message. 
Sinon, merci de me prévenir lorsque l'action a été effectuée. 

Pierre.`},
  {type:'signup_with_deposit',label:"Inscription avec dépôt",default_msg:
`Bonjour, 

Veuillez procéder à une nouvelle inscription sur le site <SITE> 
et effectuer un dépôt de <MONTANT> euros. 

Si vous avez un doute, répondez à ce message. 
Sinon, merci de me prévenir lorsque l'action a été effectuée. 

Pierre.`},
  {type:'signup_without_deposit',label:"Inscription sans dépôt",default_msg:
`Bonjour,

Veuillez procéder à une nouvelle inscription sur le site <SITE>. 

Si vous avez un doute, répondez à ce message. 
Sinon, merci de me prévenir lorsque l'action a été effectuée. 

Pierre.`},
  {type:'activation_code_validation',label:"Validation code",default_msg:
`Bonjour,

Merci de me prévenir lorsque vous aurez validé le code d'action pour le site <SITE>.
Cela signifie que nous pourrons commencer les prises de paris sur ce site. 

Si vous avez un doute, répondez à ce message. 
Sinon, merci de me prévenir lorsque l'action a été effectuée. 

Pierre.`},
  {type:'balance_check',label:"Vérification Solde",default_msg:
`Bonjour, 

Le match a eu lieu. Merci de me confirmer vos nouveaux soldes 
sur les différents sites utilisés. 

Si vous avez un doute, répondez à ce message. 
Sinon, merci de me prévenir lorsque l'action a été effectuée. 

Pierre.`},
];

