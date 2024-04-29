const steps_default = [
    {
        attachTo: { element: '#fullPictureDiv' }, content: { title: "At the beginning of every trial, you will see a picture that relates to the upcoming conversation. It may show objects, actions, or possibilities that are being discussed." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: false
          },
          popper: {
            placement: 'right'
          }
        }
      },
      {
        attachTo: { element: '#fullPictureNextBtn' }, content: { title: "Click 'NEXT' to view the conversation" }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },  
      {
        attachTo: { element: '#dialogueDiv' }, content: { title: "Please read the dialogue carefully. When you see the animated dots, that means the conversation will continue after you click the 'next' button. Click 'next' when you're ready." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },
      {
        attachTo: { element: '#targetQuestionDiv' }, content: { title: "This is the last part of the conversation that you will see in writing. In the next step, you will hear a recording of what the other person said in response." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: false
          }
        }
      },
      {
        attachTo: { element: '#targetSentenceSoundButton' }, content: { title: "Click here to play the response. You can listen to this as many times as you wish." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },
      {
        attachTo: { element: '#targetSentenceDiv' }, content: { title: "This is a transcript of the sentence you just heard. The words you will be rating are underlined." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: false
          }
        }
      },
      {
        attachTo: { element: '#ratingDiv' }, content: { title: "Select your rating for the word in red, then click submit to rate the next underlined word." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },
      {
        attachTo: { element: '#targetSentenceDiv' }, content: { title: "Now you will be rating this next word that's currently highlighted in red." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: false
          }
        }
      },
      {
        attachTo: { element: '#ratingDiv' }, content: { title: "Again, select your rating for the word in red, then click submit. Remember that you can click above to listen to the sentence again if needed." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },
]

const steps_within = [
    {
        attachTo: { element: '#fullPictureDiv' }, content: { title: "At the beginning of every trial, you will see a picture that relates to the upcoming conversation. It may show objects, actions, or possibilities that are being discussed." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: false
          },
          popper: {
            placement: 'right'
          }
        }
      },
      {
        attachTo: { element: '#fullPictureNextBtn' }, content: { title: "Sometimes, the picture will be similar to one you've seen earlier in the study, but you won't see the same picture twice. Look carefully, since the pictures provide context for the conversations that follow. Click 'NEXT' to view the conversation" }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          },
          popper: {
            placement: 'right'
          }          
        }
      },  
      {
        attachTo: { element: '#dialogueDiv' }, content: { title: "Please read the dialogue carefully. When you see the animated dots, that means the conversation will continue after you click the 'next' button. Click 'next' when you're ready." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },
      {
        attachTo: { element: '#targetQuestionDiv' }, content: { title: "This is the last part of the conversation that you will see in writing. In the next step, you will hear a recording of what the other person said in response." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: false
          }
        }
      },
      {
        attachTo: { element: '#targetSentenceSoundButton' }, content: { title: "Click here to play the response. You can listen to this as many times as you wish." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },
      {
        attachTo: { element: '#targetSentenceDiv' }, content: { title: "This is a transcript of the sentence you just heard. The words you will be rating are underlined." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: false
          }
        }
      },
      {
        attachTo: { element: '#ratingDiv' }, content: { title: "Select your rating for the word in red, then click submit to rate the next underlined word." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },
      {
        attachTo: { element: '#targetSentenceDiv' }, content: { title: "Now you will be rating this next word that's currently highlighted in red." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: false
          }
        }
      },
      {
        attachTo: { element: '#ratingDiv' }, content: { title: "Again, select your rating for the word in red, then click submit. Remember that you can click above to listen to the sentence again if needed." }, options: {
          hideButtons: {
            exit: true,
            previous: true,
            next: true
          }
        }
      },
]

export {steps_default, steps_within};