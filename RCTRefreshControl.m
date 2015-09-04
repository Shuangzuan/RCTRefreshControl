#import "RCTRefreshControl.h"

#import "ODRefreshControl.h"

#import "RCTBridge.h"
#import "RCTConvert.h"
#import "RCTScrollView.h"
#import "RCTSparseArray.h"
#import "RCTUIManager.h"
#import "RCTEventDispatcher.h"

@implementation RCTRefreshControl

#pragma mark -

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
  return self.bridge.uiManager.methodQueue;
}

RCT_EXPORT_METHOD(configure:(nonnull NSNumber *)reactTag
                  options:(NSDictionary *)options
                  callback:(RCTResponseSenderBlock)callback) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    
    UIView *view = viewRegistry[reactTag];
    if (!view) {
      RCTLogError(@"Cannot find view with tag #%@", reactTag);
      return;
    }
    
    UIScrollView *scrollView = ((RCTScrollView *)view).scrollView;
    
    ODRefreshControl *refreshControl = [[ODRefreshControl alloc] initInScrollView:scrollView];
    refreshControl.tag = [reactTag integerValue]; // Maybe something better
    
    UIColor *tintColor = options[@"tintColor"];
    // TODO: activityIndicatorViewStyle
    UIColor *activityIndicatorViewColor = options[@"activityIndicatorViewColor"];
    
    if (tintColor) refreshControl.tintColor = [RCTConvert UIColor:tintColor];
    if (activityIndicatorViewColor) refreshControl.activityIndicatorViewColor = [RCTConvert UIColor:activityIndicatorViewColor];
    
    [refreshControl addTarget:self action:@selector(dropViewDidBeginRefreshing:) forControlEvents:UIControlEventValueChanged];
    
    callback(@[[NSNull null], reactTag]);
  }];
}

RCT_EXPORT_METHOD(beginRefreshing:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    
    UIView *view = viewRegistry[reactTag];
    if (!view) {
      RCTLogError(@"Cannot find view with tag #%@", reactTag);
      return;
    }
    
    UIScrollView *scrollView = ((RCTScrollView *)view).scrollView;
    
    ODRefreshControl *refreshControl = (ODRefreshControl *)[scrollView viewWithTag:[reactTag integerValue]];
    
    dispatch_async(dispatch_get_main_queue(), ^{
      [refreshControl beginRefreshing];
    });
  }];
}

RCT_EXPORT_METHOD(endRefreshing:(nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    
    UIView *view = viewRegistry[reactTag];
    if (!view) {
      RCTLogError(@"Cannot find view with tag #%@", reactTag);
      return;
    }
    
    UIScrollView *scrollView = ((RCTScrollView *)view).scrollView;
    
    ODRefreshControl *refreshControl = (ODRefreshControl *)[scrollView viewWithTag:[reactTag integerValue]];
    
    dispatch_async(dispatch_get_main_queue(), ^{
       [refreshControl endRefreshing];
    });
  }];
}

- (NSDictionary *)constantsToExport {
  return @{@"UIActivityIndicatorViewStyleWhiteLarge": @(UIActivityIndicatorViewStyleWhiteLarge),
           @"UIActivityIndicatorViewStyleWhite": @(UIActivityIndicatorViewStyleWhite),
           @"UIActivityIndicatorViewStyleGray": @(UIActivityIndicatorViewStyleGray)};
}

- (void)dropViewDidBeginRefreshing:(ODRefreshControl *)refreshControl {
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"dropViewDidBeginRefreshing"
                                                  body:@(refreshControl.tag)];
  
  /*
  double delayInSeconds = 3.0;
  dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, delayInSeconds * NSEC_PER_SEC);
  dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
    [refreshControl endRefreshing];
  }); */
}

@end
