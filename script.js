const amount = document.querySelector('#amount');
const term = document.querySelector('#term');
const rate = document.querySelector('#rate');
const amountOutput = document.querySelector('#amountOutput');
const termOutput = document.querySelector('#termOutput');
const rateOutput = document.querySelector('#rateOutput');
const monthlyOutput = document.querySelector('#monthlyOutput');

const money = value => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 2
}).format(value);

function updateCalculator() {
  const principal = Number(amount.value);
  const months = Number(term.value);
  const monthlyRate = Number(rate.value) / 100 / 12;
  const payment = monthlyRate === 0
    ? principal / months
    : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
  amountOutput.textContent = money(principal).replace('.00', '');
  termOutput.textContent = `${months} months`;
  rateOutput.textContent = `${rate.value}%`;
  monthlyOutput.textContent = money(payment);
}
[amount, term, rate].forEach(input => input.addEventListener('input', updateCalculator));
updateCalculator();

const menuButton = document.querySelector('#menuButton');
const navMenu = document.querySelector('#navMenu');
menuButton.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('open')));

document.querySelector('#enquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const summary = [
    'DEMO PREVIEW — not sent or saved',
    `Name: ${data.get('fullName')}`,
    `Phone: ${data.get('phone')}`,
    `Enquiry: ${data.get('loanType')}`,
    `Preferred contact: ${data.get('contactMethod')}`,
    `Purpose: ${data.get('purpose') || 'Not provided'}`,
    `Calculator amount: ${money(Number(amount.value))}`,
    `Term: ${term.value} months`
  ].join('\n');
  const message = document.querySelector('#formMessage');
  message.textContent = summary;
  message.classList.add('show');
  message.scrollIntoView({behavior:'smooth', block:'nearest'});
});
