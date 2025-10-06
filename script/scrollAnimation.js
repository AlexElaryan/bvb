const cfg = {
  steps: 80,
  startW: 43.675, startH: 46.85,
  endW: 634, endH: 680,
  scrollRangeMultiplier: 1,
  startRotation: 33.163,
  endRotation: 0
};

const stage = document.getElementById('stage');
const sticky = document.getElementById('sticky');
const box = document.getElementById('box');

const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
let rAF = null;

function computeProgress() {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const stageRect = stage.getBoundingClientRect();
  const stageTopDoc = scrollY + stageRect.top;

  const startScroll = stageTopDoc;
  const scrollRange = window.innerHeight * cfg.scrollRangeMultiplier;
  const endScroll = startScroll + scrollRange;

  return clamp((scrollY - startScroll) / (endScroll - startScroll), 0, 1);
}

function updateByScroll() {
  const progress = computeProgress();

  const rawIndex = Math.floor(progress * cfg.steps);
  const stepIndex = Math.min(rawIndex, cfg.steps - 1);

  const intervals = Math.max(1, cfg.steps - 1);
  const deltaW = (cfg.endW - cfg.startW) / intervals;
  const deltaH = (cfg.endH - cfg.startH) / intervals;
  const deltaRot = (cfg.endRotation - cfg.startRotation) / intervals;

  const width = cfg.startW + deltaW * stepIndex;
  const height = cfg.startH + deltaH * stepIndex;
  const rotation = cfg.startRotation + deltaRot * stepIndex;

  box.style.width = width + 'px';
  box.style.height = height + 'px';
  box.style.transform = `rotate(${rotation}deg)`;
}

function onScroll() {
  if (rAF) return;
  rAF = window.requestAnimationFrame(() => {
    updateByScroll();
    rAF = null;
  });
}

function init() {
  box.style.width = cfg.startW + 'px';
  box.style.height = cfg.startH + 'px';
  box.style.transform = `rotate(${cfg.startRotation}deg)`;
  updateByScroll();
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => { updateByScroll(); }, { passive: true });
window.addEventListener('load', init);
window.addEventListener('DOMContentLoaded', init);
