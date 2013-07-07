//
//  BackgroundJS.h
//  BackgroundJS
//
//  Created by James O'Cull on 7/6/13.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface BackgroundJS : CDVPlugin

@property NSInteger backgroundSecondsCounter;

- (void)setBackgroundSeconds:(CDVInvokedUrlCommand*)command;
- (void)lockBackgroundTime:(CDVInvokedUrlCommand*)command;
- (void)unlockBackgroundTime:(CDVInvokedUrlCommand*)command;

@end
