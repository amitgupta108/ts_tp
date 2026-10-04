const CDN = 'https://unpkg.com/openalgo-charts@2.6.0/dist';
const { createChart } = await import(`${CDN}/openalgo-charts.mjs`);

class ChartPanel 
{
    constructor(container, options) 
    {
        this.series = {};
        this.chart = createChart(container, options);
        this.chart.timeScale().fitContent();
        qBox.addEventListener('quote', this);

    }

    show() 
    {
        requestHistory(this.symbols);
        for (let i = 0; i < this.symbols.length; i++) {
            this.series[this.symbols[i]] = this.chart.addSeries('candlestick');
            this.series[this.symbols[i]].applyOptions({ title: this.symbols[i].slice(-7) });
        }
    }

    handleEvent(event) 
    {
        const q = event.detail;
        if (this.series[q.symbol])
            renderChart(this.series[q.symbol], undefined, q);
    }

    renderHistory(qA) {
        const qs = initialSeriesData(qA);
        if (qs && qs.length > 0) {
            const symbol = getSymbol(qs[0]);
            const series = this.series[symbol];
            if (series) {
                series.setData(qs);
                this.histData[symbol] = qs;
                ++this.currentcount;
            }
        }
    }
    
}

const chartOptions = {
    theme: darkTheme,
    timezone: 'Asia/Kolkata'
};

