
function openNav() {
    document.getElementById("mySidenav").style.width = "250px"
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0"
  }
 

document.addEventListener('DOMContentLoaded', function() {
const donutChart = document.getElementById('donutChart').getContext('2d');
const doughnutChart = new Chart(donutChart, {
  type: 'doughnut',
  data: {
    labels: ['EGY', 'FR', 'GER', 'USA', 'UAE'],
    datasets: [{
      data:<%=analyticsData.numberoforderschartdata %>,
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#33FF9E', '#B533FF'
      ],
    }]
  },
});
});

document.addEventListener('DOMContentLoaded', function() {
const donutChart2 = document.getElementById('donutChart2').getContext('2d');
const doughnutChart = new Chart(donutChart2, {
  type: 'doughnut',
  data: {
    labels: ['Egypt', 'France', 'Germany', 'UAE', 'USA'],
    datasets: [{
      data: <%=analyticsData.numberofvisitorschartdata %>,
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#33FF9E', '#B533FF'
      ],
    }]
  },
});
});

