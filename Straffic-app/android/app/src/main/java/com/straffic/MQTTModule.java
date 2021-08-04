package com.straffic;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.HashMap;
import java.util.Objects;

public class MQTTModule extends ReactContextBaseJavaModule {
    MQTTService mqttService;
    MQTTService mqttService1;
    MQTTService mqttService2;
    MqttMessage mqttMessage = new MqttMessage();

    MQTTModule(ReactApplicationContext context) {
        super(context);
        mqttService = new MQTTService(context, 0);
        mqttService1 = new MQTTService(context, 1);
        mqttService2 = new MQTTService(context, 2);
        mqttMessage.setQos(0);
        mqttMessage.setId(1);
        mqttMessage.setRetained(true);

    }

    @ReactMethod
    public void connectServer(ReadableArray initTopic, ReadableArray initTopic1, ReadableArray initTopic2) {
        mqttService.connect();
        mqttService.setCallback(new MqttCallbackExtended() {
            @Override
            public void connectComplete(boolean reconnect, String serverURI) {
                Log.d("Success connection: ", serverURI);
                mqttService.subscribeTopics(initTopic.toArrayList());
            }

            @Override
            public void connectionLost(Throwable cause) {
                Log.d("Mqtt Connection failed:", Objects.toString(cause, ""));
            }

            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                Log.d("Message arrived: ", message.toString());
                WritableMap params = Arguments.createMap();
                params.putString("topic", topic);
                params.putString("message", message.toString());
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("messageArrived", params);
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {

            }
        });
        mqttService1.connect();
        mqttService1.setCallback(new MqttCallbackExtended() {
            @Override
            public void connectComplete(boolean reconnect, String serverURI) {
                Log.d("Success connection: ", serverURI);
                mqttService1.subscribeTopics(initTopic1.toArrayList());
            }

            @Override
            public void connectionLost(Throwable cause) {
                Log.d("Connection failed: ", Objects.toString(cause, ""));
            }

            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                Log.d("Message arrived: ", message.toString());
                WritableMap params = Arguments.createMap();
                params.putString("topic", topic);
                params.putString("message", message.toString());
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("messageArrived", params);
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {

            }
        });
        mqttService2.connect();
        mqttService2.setCallback(new MqttCallbackExtended() {
            @Override
            public void connectComplete(boolean reconnect, String serverURI) {
                Log.d("Success connection: ", serverURI);
                mqttService2.subscribeTopics(initTopic2.toArrayList());
            }

            @Override
            public void connectionLost(Throwable cause) {
                Log.d("Connection failed: ", Objects.toString(cause, ""));
            }

            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                Log.d("Message arrived: ", message.toString());
                WritableMap params = Arguments.createMap();
                params.putString("topic", topic);
                params.putString("message", message.toString());
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("messageArrived", params);
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {

            }
        });
    }

    @ReactMethod
    public void sendData(String topic, String data, int flag) {
        byte[] b = data.getBytes(StandardCharsets.UTF_8);
        mqttMessage.setPayload(b);
        if (flag == 0) {
            mqttService.publishTopic(topic, mqttMessage);
        } else if (flag == 1) {
            mqttService1.publishTopic(topic, mqttMessage);
        } else {
            mqttService2.publishTopic(topic, mqttMessage);
        }
    }

    @ReactMethod
    public void disconnectServer() {
        mqttService.disconnect();
        mqttService1.disconnect();
        mqttService2.disconnect();
    }

    @ReactMethod
    public void subscribeTopics(ReadableArray topic, ReadableArray topic1, ReadableArray topic2) {
        mqttService.subscribeTopics(topic.toArrayList());
        mqttService1.subscribeTopics(topic1.toArrayList());
        mqttService2.subscribeTopics(topic2.toArrayList());

    }

    @ReactMethod
    public void unsubscribeAllTopic() {
        mqttService.unsubscribeAllTopic();
        mqttService1.unsubscribeAllTopic();
        mqttService2.unsubscribeAllTopic();
    }

    @NonNull
    @Override
    public String getName() {
        return "MQTTModule";
    }
}
