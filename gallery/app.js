const $ = selector => document.querySelector(selector);
let projects = [];
let category = 'All projects';
let activeProject;
let returnId;
const frame = $('#project-frame');

function renderCards() {
  const query = $('#search').value.trim().toLowerCase();
  const visible = projects.filter(p => (category === 'All projects' || p.category === category) && `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(query));
  $('#projects').replaceChildren(...visible.map(project => {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = `#project/${project.id}`;
    card.id = `card-${project.id}`;
    card.style.setProperty('--card-color', project.color);
    card.setAttribute('aria-label', `Open ${project.title}`);
    card.innerHTML = `<div class="preview"><div class="preview-window" inert aria-hidden="true"><div class="window-bar"><i></i><i></i><i></i></div><iframe loading="lazy" tabindex="-1" title="${project.title} thumbnail" sandbox="allow-scripts allow-same-origin" src="${project.url}"></iframe></div></div><div class="card-body"><div class="card-meta"><span>${project.category}</span><span class="number">/${project.mark}</span></div><h3>${project.title}</h3><p>${project.description}</p><div class="card-bottom"><span>${project.pages ? `${project.pages.length} pages to explore` : 'Open project'}</span><b aria-hidden="true">↗</b></div></div>`;
    return card;
  }));
  $('#result-count').textContent = `${String(visible.length).padStart(2, '0')} projects${category !== 'All projects' ? ` / ${category}` : ' / The collection'}`;
  $('#empty').hidden = visible.length !== 0;
}

function navigate() {
  const [, id, page] = location.hash.split('/');
  const project = projects.find(p => p.id === id);
  $('#collection').hidden = Boolean(project);
  $('#viewer').hidden = !project;
  if (!project) {
    frame.removeAttribute('src');
    activeProject = null;
    document.title = 'The Scrimba archive · Matt Moreno';
    if (returnId) document.getElementById(`card-${returnId}`)?.focus({ preventScroll: true });
    return;
  }
  const changedProject = activeProject?.id !== project.id;
  activeProject = project;
  returnId = project.id;
  const pages = project.pages || [['Home', project.entry]];
  const selectedPage = pages.find(([, path]) => path === page)?.[1] || project.entry;
  const url = new URL(selectedPage, new URL('/', project.url)).href;
  $('#viewer-title').textContent = project.title;
  $('#viewer-category').textContent = project.category;
  document.title = `${project.title} · Scrimba archive`;
  $('#pages').replaceChildren(...pages.map(([label, value]) => new Option(label, value, false, value === selectedPage)));
  $('#pages-label').hidden = pages.length < 2;
  $('#project-note').textContent = project.note || '';
  $('#project-note').hidden = !project.note;
  $('#open-original').href = url;
  frame.title = project.title;
  frame.src = url;
  if (changedProject) $('#viewer-title').focus();
}

$('#search').addEventListener('input', renderCards);
$('#back').addEventListener('click', () => { location.hash = ''; });
$('#reload').addEventListener('click', () => { frame.src = frame.src; });
$('#pages').addEventListener('change', event => { location.hash = `project/${activeProject.id}/${event.target.value}`; });
document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => {
  frame.classList.toggle('phone', button.dataset.size === 'mobile');
  document.querySelectorAll('[data-size]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
}));
window.addEventListener('hashchange', navigate);

try {
  const response = await fetch('/api/projects');
  if (!response.ok) throw new Error('Unable to load projects');
  projects = await response.json();
  for (const name of ['All projects', 'Foundations', 'JavaScript', 'React']) {
    const button = document.createElement('button');
    const count = projects.filter(p => name === 'All projects' || p.category === name).length;
    button.innerHTML = `<span>${name}</span><span>${String(count).padStart(2, '0')}</span>`;
    button.setAttribute('aria-pressed', String(name === category));
    button.addEventListener('click', () => {
      category = name;
      $('#filters').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      renderCards();
    });
    $('#filters').append(button);
  }
  renderCards();
  navigate();
} catch {
  $('#result-count').textContent = 'The collection could not load. Restart the local server and refresh this page.';
}
