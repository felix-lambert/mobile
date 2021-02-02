package com.mobile;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.util.Log;

import javax.annotation.Nullable;

public class AccessibilityServiceModule extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext;

  public AccessibilityServiceModule(ReactApplicationContext reactContext) {
    super(reactContext);
    // AccessibilityServiceModule.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "AccessibilityService";
  }

  @ReactMethod
  public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
    callback.invoke("Received number: " + numberArgument + " string: " + stringArgument);
  }

  private static void sendEvent(
    ReactContext reactContext,
    String eventName,
    @Nullable String params
  ) {

      Log.d("Notification", "send event");
  
  reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }

  public static void prepareEvent(String params) {
    sendEvent(reactContext, "EventReminder", params);
  }
}
