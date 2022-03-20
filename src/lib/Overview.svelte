
<script>
    import { onMount, onDestroy, afterUpdate } from 'svelte';
    import data from "../assets/data";
    import { Chart, registerables } from 'chart.js/dist/chart.esm';
    import { foodChartData, utilChartData } from '../assets/overviewDatasets';
    // @ts-ignore
    // Ignoring because register is appended to the chart object after compilation
    const { register } = Chart;
    register(...registerables);
    export let overviewType = $$props.overviewType;
    let avgChart = null, chart = null, chartData = null;
    let chartContext, avgChartContext;
    const chartType = 'bar';
    
    
    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: `${overviewType === 'Food' ? 'Food' : 'Utility'} cost by month`,
            },
        },
        scales: {
            y: {
                stacked: true,
            },
        },
    };

    const avgChartOptions = {
        plugins: {
            title: {
                display: true,
                text: "Average Food cost by month",
            },
        },
        scales: {
            y: {
                beginAtZero: true
            },
        },
    }
    
    const monthMap = {
        'Jan' : 1,
        'Feb' : 2,
        'Mar' : 3,
        'Apr' : 4,
        'May' : 5,
        'Jun' : 6,
        'Jul' : 7,
        'Aug' : 8,
        'Sep' : 9,
        'Oct' : 10,
        'Nov' : 11,
        'Dec' : 12
    }
    const getAverageAnnualUtilityCostForOccupant = (occupantCount) => { 
        return data.filter((d) => d.type !== 'Food')
                .filter((d) => d.occupants === occupantCount)
                .map((d) => d.cost)
                .reduce((previousCost, currentCost) => previousCost + currentCost) / 2;
    };
    const getTotalUtilityCostByYear = (year) => {
        console.log(`formatted month: ${monthMap[data[0].month]}`)
        return data.filter((d) => { 
            if(year === '2020') {
                return  (monthMap[d.month] < 6 && d.year === year + 1) || d.year === year;
            } else {
                return monthMap[d.month] >= 6 && d.year === year;
            }
        }).map((d) => d.cost)
          .reduce((previousCost, currentCost) => previousCost + currentCost);
    };
    let selectedAverage, selectedTotal, selectedYear, selectedMonthlyTotal,selectedYearMTotal;
    const setSelectedAverage = (occupantCount) => {
        selectedAverage = `$${getAverageAnnualUtilityCostForOccupant(occupantCount).toFixed(2)}`;
    }
    const setSelectedTotal = (year) => {
        if(year) {
            selectedYear = year;
            selectedTotal = `$${getTotalUtilityCostByYear(year).toFixed(2)}`;
        }
    }
    const setSelectedMonthlyTotal = (year) => {
        if(year) {
            selectedYearMTotal = year;
            selectedMonthlyTotal = `$${((getTotalUtilityCostByYear(year) / 12) / 4).toFixed(2)}`;
        }
    }

    const averageUtilChartData = {
        labels: ['2020-2021'],
        datasets: [
            {
                label: '2020',
                data: data.filter((d) => d.year === '2020')
                .map((d) => d.cost),
                backgroundColor: ["rgba(82, 45, 192, 0.2)"],
                borderColor: ["rgba(82, 45, 192, 1)"],
            },
            {
                label: '2021',
                data: data.filter((d) => d.year === '2021')
                .map((d) => d.cost),
                backgroundColor: ["rgba(62, 155, 192, 0.2)"],
                borderColor: ["rgba(62, 155, 192, 1)"],
            },
        ]
    }

    onMount(() => {
        chartData = overviewType === 'Food' ? foodChartData : utilChartData;
        chart = new Chart(chartContext, {
            type: chartType,
            data: chartData,
            options: chartOptions
        });
        avgChart = new Chart(avgChartContext, {
            type: 'bar',
            data: averageUtilChartData,
            options: avgChartOptions
        });
    });
    afterUpdate(() => {
        if(!chart) return;
        if(!avgChart) return;

        chart.data = overviewType === 'Food' ? foodChartData : utilChartData;
        chart.type = chartType;
        chart.options = chartOptions;
        chart.update();

        avgChart.data = averageUtilChartData;
        avgChart.type = 'bar';
        avgChart.options = avgChartOptions;
        avgChart.update();
    });
    onDestroy(() => { chart = null; avgChart = null; });
</script>
<div>
    {#if overviewType !== 'Food'}
    <div class='flex-container'>
        <div class='flex-child'>
            <canvas bind:this={avgChartContext} width="300px" height="200px"></canvas>
            <p>Average utility cost per occupant: {selectedAverage}</p>
            <button on:click={() => setSelectedAverage(3)}>3</button>
            <button on:click={() => setSelectedAverage(4)}>4</button>
        </div>
        <div class='flex-child'>
            <p>Total utility cost in
                <select bind:value={selectedYear} on:change={() => setSelectedTotal(selectedYear)} name="selectedYear">
                    <option value="">Select year</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                </select> is {selectedTotal}
            </p>
            <p>Monthly utility cost per person in
                <select bind:value={selectedYearMTotal} on:change={() => setSelectedMonthlyTotal(selectedYearMTotal)} name="selectedYear">
                    <option value="">Select year</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                </select> is {selectedMonthlyTotal}
            </p>
        </div>
    </div>
    <canvas bind:this={chartContext} width="200px" height="100px"></canvas>
    {:else}
        <canvas bind:this={chartContext} width="200px" height="100px" />
    {/if}
</div>

<style>
    .flex-container {
        display: flex;
    }
    .flex-child {
        flex: 1;
        border: 2px solid grey;
    }
    .flex-child:first-child {
        margin-right: 0.5rem;
    }
</style>
