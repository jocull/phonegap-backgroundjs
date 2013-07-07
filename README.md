PhoneGap + Background.js
=====================

Whoa! Now you can background JavaScript operations on iOS with PhoneGap!

Read more here: http://www.codefromjames.com/wordpress/?p=154

Uses a sleep countdown timer paired with a UIBackgroundTaskIdentifier. The magic looks like this:

	- (void)doBackgroundTimeLoop
	{
		__block UIBackgroundTaskIdentifier task;
		UIApplication* app = [UIApplication sharedApplication];
		task = [app beginBackgroundTaskWithExpirationHandler:^{
			[app endBackgroundTask:task];
			task = UIBackgroundTaskInvalid;
		}];
	
		while(YES){
			@synchronized(self){
				backgroundSecondsCounter--;
				NSLog(@"Remaining background seconds: %i", backgroundSecondsCounter);
				if (backgroundSecondsCounter <= 0)
					break; // Exit loop
			}
			[NSThread sleepForTimeInterval:1];
		}
	
		// End this background task now
		[app endBackgroundTask:task];
		task = UIBackgroundTaskInvalid;
	}

While the background task is active, anything goes! You can run JavaScript in the background.

Copy `BackgroundJS.h` and `BackgroundJS.m` to your `Plugins` folder on your app.

Then, simply include the script:

	<script type="text/javascript" src="BackgroundJS.js"></script>
	
...enable the plugin in `config.xml`:

    <plugins>
    	...
        <plugin name="BackgroundJS" value="BackgroundJS" />
    </plugins>
    
...and request some background time from JavaScript!

Get a block of seconds:

	BackgroundJS.SetBackgroundSeconds(10);

Run in the background indefinitely:

	BackgroundJS.LockBackgroundTime();

Stop running background tasks immediately:

	BackgroundJS.UnlockBackgroundTime();

Be careful when using this, as Apple specifications are picky.
If you're not using background audio or tracking location, your app may be rejected for background tasking guidelines.
Read up, and write some code!

ALSO... Please don't kill my battery life just because you backgrounded more than you had to.
You're not a special snowflake (yet) so play by the rules. Code smart, and make your app work right!

Have a patch? Pull requests appreciated!

Thanks! -James
