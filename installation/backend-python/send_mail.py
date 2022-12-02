from mailjet_rest import Client
import base64

def send_mail(mail_from, mail_to, api_key, api_secret):

  with open("alarm.jpeg", "rb") as image_file:
      encoded_string = base64.b64encode(image_file.read()).decode()

  mailjet = Client(auth=(api_key, api_secret), version='v3.1')
  data = {
    'Messages': [
      {
        "From": {
          "Email": mail_from,
          "Name": "Security System"
        },
        "To": [
          {
            "Email": mail_to,
            "Name": "You"
          }
        ],
        "Subject": "Movement detected",
        "TextPart": "Movement has been detected and your alarm has been triggered.",
        "InlinedAttachments": [
              {
                "ContentType": "image/jpeg",
                "Filename": "alarm.jpeg",
                "Base64Content": encoded_string
              }
            ]
      }
    ]
  }
  result = mailjet.send.create(data=data)
