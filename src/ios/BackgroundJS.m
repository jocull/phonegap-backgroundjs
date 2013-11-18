//
//  BackgroundJS.m
//  BackgroundJS
//
//  Created by James O'Cull on 7/6/13.
//
//

#import "BackgroundJS.h"

@implementation BackgroundJS

@synthesize backgroundSecondsCounter;


- (void)pluginInitialize
{
    backgroundSecondsCounter = 0;
    [super pluginInitialize];
}

// private
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
            if(backgroundSecondsCounter < 60 || backgroundSecondsCounter % 60 == 0)
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

// private
- (void)setBackgroundSecondsWithSeconds:(NSNumber*)seconds
{
    NSInteger secondsInt = [seconds integerValue];
    @synchronized(self){
        NSInteger preAddSeconds = backgroundSecondsCounter;

        // Set to a minimum amount of time
        if(backgroundSecondsCounter < secondsInt && secondsInt > 0)
            backgroundSecondsCounter = secondsInt;

        // Start if not started
        if(preAddSeconds <= 0 && backgroundSecondsCounter > 0){
            [self performSelectorInBackground:@selector(doBackgroundTimeLoop) withObject:nil];
        }
    }
}

- (void)setBackgroundSeconds:(CDVInvokedUrlCommand *)command
{
    if([command.arguments count] > 0
       && [[command argumentAtIndex:0] isKindOfClass:[NSNumber class]])
    {
        [self setBackgroundSecondsWithSeconds:[command argumentAtIndex:0]];
    }
}

- (void)lockBackgroundTime:(CDVInvokedUrlCommand *)command
{
    // Push it to the limit!
    [self setBackgroundSecondsWithSeconds:[NSNumber numberWithInteger:NSIntegerMax]];
}

- (void)unlockBackgroundTime:(CDVInvokedUrlCommand *)command
{
    @synchronized(self){
        backgroundSecondsCounter = -1; // Must set manually to override
    }
    [self setBackgroundSecondsWithSeconds:[NSNumber numberWithInteger:backgroundSecondsCounter]];
}

@end
