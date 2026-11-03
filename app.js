const posts = [
  {id:1,author:'Aisha Khan',initials:'AK',avatar:'avatar-aisha',course:'Art & Design · Year 12',time:'18 min ago',type:'friends',text:'Little reminder that you don’t have to have it all figured out. Made something just for fun in the studio today and it felt so good 🎨',likes:18,comments:4,liked:false,saved:false,image:'club-image',emoji:'🎨',caption:'A little colour goes a long way'},
  {id:2,author:'Northbridge Student Union',initials:'SU',avatar:'avatar-union',course:'Official college account',time:'42 min ago',type:'college',text:'The winter social is officially happening this Friday! ❄️ Tickets are on sale from the student hub. Bring your flatmates, course mates, or come solo — everyone’s welcome.',likes:36,comments:12,liked:false,saved:false,image:null,caption:null},
  {id:3,author:'Leo Williams',initials:'LW',avatar:'avatar-leo',course:'Computing · Year 13',time:'1 hr ago',type:'friends',text:'Found my new favourite study spot. East Wing library has loads of quiet desks now — and the big windows are a bonus 📚',likes:11,comments:2,liked:false,saved:false,image:'study-image',emoji:'📚',caption:'East Wing is a study-space win'},
  {id:4,author:'Northbridge Film Club',initials:'FC',avatar:'avatar-club',course:'Clubs & societies',time:'2 hrs ago',type:'clubs',text:'Film club tonight at 6 in the media room! This week we’re picking a cosy autumn watch together. New faces always welcome 🍿',likes:9,comments:3,liked:false,saved:false,image:null,caption:null},
  {id:5,author:'Priya Shah',initials:'PS',avatar:'avatar-priya',course:'Biology · Year 12',time:'3 hrs ago',type:'friends',text:'A very important campus review: the halloumi bowl at dinner is a 10/10. Get there before it goes! 🥗',likes:24,comments:6,liked:false,saved:false,image:'campus-image',emoji:'🥗',caption:'Tonight’s dinner was a good idea'}
];
let activeFilter='all';
let toastTimer;
const postList=document.querySelector('#post-list');
const toastElement=document.querySelector('#toast');
const escapeHTML=(value)=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function renderPosts(){
  const query=document.querySelector('#search-input').value.trim().toLowerCase();
  const visible=posts.filter(post=>{
    const matchesFilter=activeFilter==='all'||(activeFilter==='friends'&&post.type==='friends')||post.type===activeFilter;
    const matchesSearch=!query||`${post.author} ${post.course} ${post.text}`.toLowerCase().includes(query);
    const savedOnly=location.hash==='#saved';
    return matchesFilter&&matchesSearch&&(!savedOnly||post.saved);
  });
  postList.innerHTML=visible.map(post=>`<article class="post-card" data-post="${post.id}">
    <div class="post-author"><span class="avatar ${escapeHTML(post.avatar)}">${escapeHTML(post.initials)}</span><div class="post-author-info"><strong>${escapeHTML(post.author)}</strong><small>${escapeHTML(post.course)} <span>·</span> ${escapeHTML(post.time)}</small></div><button class="post-more" aria-label="More options for ${escapeHTML(post.author)}'s post" data-action="post-options">···</button></div>
    <p class="post-copy">${escapeHTML(post.text)}</p>
    ${post.image?`<div class="post-image ${escapeHTML(post.image)}" role="img" aria-label="${escapeHTML(post.caption||'Campus moment')}"><span>${escapeHTML(post.emoji||'✳')}</span><span class="image-caption">${escapeHTML(post.caption||'Campus moment')}</span></div>`:''}
    <div class="post-meta">${post.liked?'💜 ':''}${post.likes} ${post.likes===1?'pal':'pals'} enjoyed this <span>·</span> ${post.comments} comments</div>
    <div class="post-actions"><button class="post-action ${post.liked?'liked':''}" data-action="like" data-id="${post.id}" aria-pressed="${post.liked}"><span>${post.liked?'♥':'♡'}</span>${post.liked?'Liked':'Like'}</button><button class="post-action" data-action="comment" data-id="${post.id}"><span>▢</span>Comment</button><button class="post-action" data-action="share" data-id="${post.id}"><span>↗</span>Share</button><button class="post-action ${post.saved?'saved':''}" data-action="save" data-id="${post.id}" aria-label="${post.saved?'Remove saved post':'Save post'}"><span>${post.saved?'🔖':'♧'}</span></button></div>
  </article>`).join('');
  document.querySelector('#empty-state').classList.toggle('hidden',visible.length>0);
  document.querySelector('.load-more').classList.toggle('hidden',visible.length===0);
}
function showToast(message){toastElement.textContent=message;toastElement.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastElement.classList.remove('show'),2500)}
function openCompose(){document.querySelector('#compose-dialog').showModal();setTimeout(()=>document.querySelector('#post-text').focus(),50)}
document.addEventListener('click',event=>{
  const action=event.target.closest('[data-action]')?.dataset.action;
  const nav=event.target.closest('[data-nav]');
  if(nav){document.querySelectorAll('[data-nav]').forEach(item=>item.classList.toggle('active',item===nav));const target=nav.dataset.nav;if(target==='home'){location.hash='home';activeFilter='all';document.querySelectorAll('.feed-tab').forEach(t=>{const selected=t.dataset.filter==='all';t.classList.toggle('selected',selected);t.setAttribute('aria-selected',selected)});renderPosts()}else if(target==='discover'||target==='people')showToast('Finding your campus people...');else if(target==='messages')showToast('Your campus inbox is coming soon.');else if(target==='saved'){location.hash='saved';renderPosts();document.querySelector('#feed').scrollIntoView({behavior:'smooth'})}else if(target==='updates'){document.querySelector('#updates').scrollIntoView({behavior:'smooth'});showToast('Here are the latest campus notices.')}else if(target==='food'){document.querySelector('#food').scrollIntoView({behavior:'smooth'})}else showToast('Your profile is looking good!');return;}
  if(action==='compose')openCompose();
  if(action==='photo')showToast('Photo sharing is ready — add a photo to your post soon.');
  if(action==='feeling')showToast('Every kind of day belongs here 💛');
  if(action==='notifications')showToast('You’re all caught up on notifications.');
  if(action==='privacy')showToast('Your exact location is never collected or shared.');
  if(action==='profile')showToast('Profile settings are coming soon.');
  if(action==='all-stories'||action==='all-people')showToast('You’re seeing everyone who’s sharing today.');
  if(action==='post-options')showToast('Thanks for keeping Campus Pal kind and welcoming.');
  if(action==='comment')showToast('Comments are on their way — start a conversation in person!');
  if(action==='share')showToast('Post link copied to your clipboard (demo).');
  if(action==='sort')showToast('Showing posts from your campus community.');
  if(action==='menu-details')showToast('Dinner is served at The Commons, 5–7 pm.');
  if(action==='tickets')showToast('Ask at the student hub for winter social tickets.');
  if(action==='library')showToast('The extra quiet desks are in the East Wing.');
  if(action==='all-updates'||action==='notice-options')showToast('You’re up to date with college notices.');
  if(action==='audience')showToast('Your post audience is set to friends.');
  if(action==='load-more')showToast('That’s everything for now — check back soon!');
  if(action==='add-story'){showToast('Story sharing is coming soon. In the meantime, share a post!');}
  if(action==='like'){const post=posts.find(item=>item.id===Number(event.target.closest('[data-id]').dataset.id));post.liked=!post.liked;post.likes+=post.liked?1:-1;renderPosts()}
  if(action==='save'){const post=posts.find(item=>item.id===Number(event.target.closest('[data-id]').dataset.id));post.saved=!post.saved;renderPosts();showToast(post.saved?'Saved for later.':'Removed from your saved posts.')}
  const person=event.target.closest('[data-person]');if(person){person.textContent='✓';person.classList.add('connected');person.disabled=true;showToast(`You and ${person.dataset.person} can say hello!`)}
  const story=event.target.closest('[data-story]');if(story){document.querySelector('#story-copy').textContent=`${story.dataset.story} shared a little campus moment ✨`;document.querySelector('#story-dialog').showModal()}
});
document.querySelectorAll('.feed-tab').forEach(tab=>tab.addEventListener('click',()=>{activeFilter=tab.dataset.filter;location.hash='home';document.querySelectorAll('.feed-tab').forEach(item=>{const selected=item===tab;item.classList.toggle('selected',selected);item.setAttribute('aria-selected',selected)});renderPosts()}));
document.querySelector('#search-input').addEventListener('input',renderPosts);
document.querySelector('#compose-form').addEventListener('submit',event=>{event.preventDefault();const textarea=document.querySelector('#post-text');const text=textarea.value.trim();if(!text)return;posts.unshift({id:Date.now(),author:'Jamie Morgan',initials:'JM',avatar:'avatar-me',course:'Year 12 · Northbridge College',time:'Just now',type:'friends',text,likes:0,comments:0,liked:false,saved:false});textarea.value='';document.querySelector('#char-count').textContent='0 / 500';document.querySelector('#compose-dialog').close();activeFilter='all';document.querySelectorAll('.feed-tab').forEach(tab=>{const selected=tab.dataset.filter==='all';tab.classList.toggle('selected',selected);tab.setAttribute('aria-selected',selected)});renderPosts();showToast('Your post is live on campus ✨');window.scrollTo({top:0,behavior:'smooth'})});
document.querySelector('#post-text').addEventListener('input',event=>{document.querySelector('#char-count').textContent=`${event.target.value.length} / 500`});
document.querySelector('#menu-day').addEventListener('click',event=>{const button=event.currentTarget;const tomorrow=button.dataset.day==='today';button.dataset.day=tomorrow?'tomorrow':'today';button.innerHTML=tomorrow?'Tomorrow <span>⌄</span>':'Today <span>⌄</span>';document.querySelector('#dinner-name').textContent=tomorrow?'Mac & cheese with a crispy crumb':'Roasted veggie & halloumi bowl';document.querySelector('#dinner-description').textContent=tomorrow?'Creamy comfort food, served with seasonal greens.':'Herby grains, roasted squash, greens & lemon dressing.'});
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();document.querySelector('#search-input').focus()}if(event.key==='Escape'){document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close())}});
renderPosts();
