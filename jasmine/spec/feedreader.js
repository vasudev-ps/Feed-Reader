/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* Placing all of our tests within the $() function,
 * since some of these tests may require DOM elements.
 */
$(function() {
    /* This is first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //using foreach loop check the url to be defined.
         it('every URL in allFeeds defined',function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
          //using foreach loop check the name to be defined.
        it('every Name in allFeeds defined',function(){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default.
         */
        var body = $('body');
        var hambergur = $( ".menu-icon-link" );

        it('menu element is hidden by default',function(){
            //check if body element contains menu-hidden class
            expect(body.hasClass("menu-hidden")).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          * This test have two expectations: the menu displays when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when icon is clicked',function(){
            //trigger click event on hamberger menu and check the changes
            //on body element (menu-hidden) class.
            hambergur.trigger( "click" );
            expect(body.hasClass("menu-hidden")).toBe(false);
            hambergur.trigger( "click" );
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        var entryLenth ;
        //load the feed before testing
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('atleast one element within feed after loadFeed',function(done){
            //feed section should not be empty to pass
            entryLenth = $('.feed .entry-link .entry').length;
            expect(entryLenth).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

            var oldFeed,newFeed;
            var container = $('.feed');

            var getFeed = function() {
                //returns content of feed section
                return container.html();
            };

            //load the feed before testing and store in oldFeed variable
            beforeEach(function(done){
                loadFeed(0, function(){
                    oldFeed = getFeed();
                    //change feed section (loading different feed)
                    loadFeed(1, done);
                });
            });

            it('Content changes after loadFeed()',function(done){
                //store new feeds in newFeed variable
                newFeed = getFeed();
                //check if notequal to pass the test
                expect(newFeed).not.toEqual(oldFeed);
                done();
            });

         });
}());