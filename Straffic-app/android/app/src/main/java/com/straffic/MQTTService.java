package com.straffic;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.*;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class MQTTService {
    @SuppressLint("AuthLeak")
    final String serverUri = "ssl://io.adafruit.com:8883";
    final String clientId = MqttAsyncClient.generateClientId();
    String username = "";
    String password = "";
    ArrayList<String> subscribedTopicList = new ArrayList<>();
    public MqttAndroidClient mqttAndroidClient;

    public MQTTService(Context context, int flag) {
        if (flag == 0) {
            username = "CSE_BBC";
            password = "";
        } else if (flag == 1) {
            username = "CSE_BBC1";
            password = "";
        } else {
            username = "tudaobku";
            password = "";
        }
        mqttAndroidClient = new MqttAndroidClient(context, serverUri, clientId);
        mqttAndroidClient.setCallback((new MqttCallbackExtended() {
            @Override
            public void connectComplete(boolean reconnect, String serverURI) {
                Log.d("Mqtt: ", serverURI);
            }

            @Override
            public void connectionLost(Throwable cause) {

            }

            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                Log.d("Mqtt: ", message.toString());

            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {

            }
        }));
    }

    public void setCallback(MqttCallbackExtended callback) {
        mqttAndroidClient.setCallback((callback));
    }

    public void connect() {
        MqttConnectOptions mqttConnectOptions = new MqttConnectOptions();
        mqttConnectOptions.setAutomaticReconnect((true));
        mqttConnectOptions.setCleanSession((true));
        mqttConnectOptions.setUserName(username);
        mqttConnectOptions.setPassword(password.toCharArray());
        try {
            mqttAndroidClient.connect(mqttConnectOptions, null, new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    DisconnectedBufferOptions disconnectedBufferOptions = new DisconnectedBufferOptions();
                    disconnectedBufferOptions.setBufferEnabled((true));
                    disconnectedBufferOptions.setBufferSize(100);
                    disconnectedBufferOptions.setPersistBuffer(false);
                    disconnectedBufferOptions.setDeleteOldestMessages(false);
                    mqttAndroidClient.setBufferOpts(disconnectedBufferOptions);

                }

                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    Log.d("Mqtt", "Failed to connect to " + username + " " + exception.toString());
                }
            });
        } catch (MqttException e) {
            Log.d("Connection Error: ", e.toString());

        }
    }

    public void publishTopic(String topic, MqttMessage msg) {
        try {
            mqttAndroidClient.publish(topic, msg);
        } catch (Exception e) {
            Log.e("Publish Error: ", e.toString());
        }
    }

    public void disconnect() {
        try {
            if (mqttAndroidClient.isConnected()) {
                mqttAndroidClient.disconnect(null, new IMqttActionListener() {
                    @Override
                    public void onSuccess(IMqttToken asyncActionToken) {
                        mqttAndroidClient.close();
                    }

                    @Override
                    public void onFailure(IMqttToken asyncActionToken, Throwable exception) {

                    }

                });
            }
        } catch (Exception e) {
            Log.e("Error: ", e.toString());
        }
    }

    public void subscribeTopics(ArrayList<Object> topicList) {
        for (int i = 0; i < topicList.size(); i++) {
            String topic = topicList.get(i).toString();
            try {
                if (mqttAndroidClient.isConnected()) {
                    mqttAndroidClient.subscribe(topic, 0, null, new IMqttActionListener() {
                        @Override
                        public void onSuccess(IMqttToken asyncActionToken) {
                            subscribedTopicList.add(topic);
                            Log.d(topic, ": Subscribed");
                        }

                        @Override
                        public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                            Log.d(topic, ": Subscribed fail!");
                        }
                    });
                }
            } catch (MqttException ex) {
                System.err.println("Can't subscribe" + topic);
                ex.printStackTrace();
            }
        }

    }

    public void unsubscribeAllTopic() {
        try {
            mqttAndroidClient.unsubscribe(subscribedTopicList.toArray(new String[0]));
        } catch (Exception e) {
            Log.d(subscribedTopicList.toString(), ": Subscribed fail!");
        }
    }
}
