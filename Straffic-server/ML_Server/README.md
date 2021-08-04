ML Straffic-server


Phần server cung cấp api cho ứng dụng ML Straffic url: ml-traffic-server.herokuapp.com


1. POST /predict/anomaly_detection:


  req:
  
  
    value: {temperature: list(int) , noise: list(int) , gas:list(int) }
    
    
  res:
  
  
    response: list các data, 0 nếu bình thường và 1 nếu vượt ngưỡng. Ví dụ: [0,1,1]
