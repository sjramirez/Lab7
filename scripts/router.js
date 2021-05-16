// router.js

export const router = {};
/**
 * Changes the "page" (state) that your SPA app is currently set to
 */


router.setState = function( state, element) {
  const body = document.querySelector('body');
  const headerFont = document.querySelector('header h1');
  if(state == "settings")
  {
    history.pushState("settings",null,"settings");
    //history.pushState(body.className,body.className,"settings");
    headerFont.textContent = "Settings";
    body.className = "settings";
  }

  else if(state == "single-entry")
  {
    //getEntryNumber
    history.pushState(element,null,"entry");
    body.className = "single-entry";
    headerFont.textContent = "Single Entry";
    let single = document.querySelector('entry-page');
    if(single.shadowRoot.querySelector('.post .entry-image'))
    {
      let img = single.shadowRoot.querySelector('.post .entry-image');
      img.remove();
    }
    single.entry = element;  
  }

  else if(state == "")
  {
    history.pushState(null,null,"");
    body.className = "";
    headerFont.textContent="Journal Entries";
  }
    
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   * 
   * - If you look at the CSS, we have 2 classes you can add to the body element to help change states, "settings" and "single-entry"
   * - Changing states will require more than just changing these classes, for example the settings page requires you to change the title to "Settings"
   * - And each individual entry the title changes to "Entry #" based on it's number in the entry order
   *
   * - When changing states, make sure the back and forward buttons work. You can use hash URLs (e.g. https://someurl.com/#settings) when changing states
   *   to make things easier.
   * - Similarly, when viewing an individual entry, a hashed URL might look like https://someurl.com/#entry3
   * 
   * - Some tips:
   *    1. Push a new state object to the history object using history.pushState() 
   *    2. look up the documentation for how to use pushState() when you try it
   *    3. look up the documentation for the "popstate" event listener (fires only on back button), useful in your script.js file
   *    4. For each <journal-entry> element, you can grab the JSON version of its info with .entry (e.g. someJournalEntryElement.entry)
   *       a. This is useful when viewing a single entry. You may notice an <entry-page> element in the HTML, this is the element that is displayed when the
   *          .single-entry class is applied to the body. You can populate this element by using .entry similarly. So if I wanted to grab a specific <journal-entry>
   *          and populate it's info into the <entry-page>, I would simply use an assignment of entryPageElement.entry = journalEntryElement.entry
   *       b. Clearing the <entry-page> element of its previous data can be a bit tricky, it might be useful to just delete it and insert a new blank one 
   *          in the same spot each time. Just a thought.
   *
   * - Answers to some questions you may have:
   *    1. You may add as many helper functions in this file as you like
   *    2. You may modify the parameters of setState() as much as you like
   */
}


const settingCog = document.querySelector('header img');

/*
settingCog.addEventListener('click', () => {
  //console.log(settingCog.src);
  router.setState("settings");
});
*/

window.addEventListener('popstate', e => {
  let prev=history.state;
  if(e.state == "settings")
  {
    goBack("settings", e.state);
  }
  else if(e.state){
    goBack("single-entry", e.state);
  }
  else{
    goBack("", null);
  }
});

function goBack(state,entry)
{
  const body = document.querySelector('body');
  const headerFont = document.querySelector('header h1');
  if(state == ""){
    body.className = state;
    headerFont.textContent="Journal Entries";
  }
  else if (state == "single-entry"){
    body.className = state;
    headerFont.textContent="Single Entry";
    let single = document.querySelector('entry-page');
    if(single.shadowRoot.querySelector('.post .entry-image'))
    {
      let img = single.shadowRoot.querySelector('.post .entry-image');
      img.remove();
    }
    single.entry = entry;  
  }
  else{
    body.className = state;
    headerFont.textContent = "Settings";
  }
}

document.addEventListener('click', () => {
 let clickedElement = event.target;
 if(clickedElement.matches('journal-entry'))
 {
   console.log(clickedElement);
   router.setState("single-entry", clickedElement.entry);
 }
 else if(clickedElement.matches('header img'))
 {
   router.setState("settings", null);
 }

 else if(clickedElement.matches('header h1'))
 {
   router.setState("", null);
 }
});

