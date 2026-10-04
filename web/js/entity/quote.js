class QuoteDispatcher extends EventTarget {

    constructor() {
        super();
    }

    dispatchEvent(eventName, q)
    {
        super.dispatchEvent(generateEvent(q.key, q));
        if (q.key === 'futures'){
            latency_label.textContent = Math.round(Date.now() - q.ltt); 
            if(q.exchange.toLowerCase().startsWith('mcx'))
                super.dispatchEvent(generateEvent('index', q));
        }
    }
}