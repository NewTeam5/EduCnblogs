package com.cnblogandroid;

import com.facebook.react.ReactActivity;
import cn.jiguang.analytics.android.api.JAnalyticsInterface;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CnBlogAndroid";
    }

    @Override
    protected void onResume(){
        super.onResume();
        JAnalyticsInterface.onPageStart(this,this.getClass().getCanonicalName());
    }

    @Override
    protected void onPause(){
        super.onPause();
    }

    @Override
    protected void onDestory(){
        super.onDestory();
        JAnalyticsInterface.onPageEnd(this,this.getClass().getCanonicalName());
    }
}
