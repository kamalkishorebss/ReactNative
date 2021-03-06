package com.demoapp;

import android.app.Application;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import ca.bigdata.voice.contacts.BDVSimpleContactsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFetchBlobPackage(),
          new ImagePickerPackage(),
          new ContactsWrapperPackage(),
          new ReactNativeContacts(),
          new RNGeocoderPackage(),
          new RNFusedLocationPackage(),
          new BDVSimpleContactsPackage(),
          new RNImmediatePhoneCallPackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
  
}
