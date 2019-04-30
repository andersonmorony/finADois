Python
import cv2
webcam   = cv2.VideoCapture(0) #instancia o uso da webcam
janela   = "Tela de captura"
cv2.namedWindow(janela, cv2.CV_WINDOW_AUTOSIZE) #cria uma janela
while True:
  s, imagem = webcam.read() #pega efeticamente a imagem da webcam
  cv2.imshow(janela,imagem) #mostra a imagem captura na janela
  
  #o trecho seguinte é apenas para parar o código e fechar a janela
  if cv2.waitKey(1) & 0xFF == ord('q'):
    cv2.destroyWindow(janela)
    break

print "Fim"