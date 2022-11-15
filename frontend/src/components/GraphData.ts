class GraphData {
    name: any;
    data: object;
    type: any;
    label: any;
    loaded: boolean;
    keys: object;

    constructor(graphName : any) {
        this.name = graphName;
        this.label = '';
        this.data = {};
        this.type = '';
        this.loaded = false;
        this.keys = {};
    }

    init(data: object) {
        this.data = {
            axis: 'y',
            datasets: [{
                data: data['data']
            }],
            labels: data['labels']
        };
        this.type = data['chart_type'];
        this.label = data['label'];

        console.log(this.data);
        // // get xy keys
        // let data_item = data['data'][0];
        // let keys = Object.keys(data_item);
        // this.keys = {
        //     xAxisKeys: keys[0],
        //     yAxisKeys: keys[1]
        // };
        // console.log(this.keys)

    }

    async getAPIData() {
        fetch(import.meta.env['VITE_API_URL'] + this.name)
            .then((response) => { return response.json() })
            .then((data) => { 
                this.loaded = true;
                this.init(data);
            })
            .catch((err) => console.error(err))
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    isBar() {
        return this.type === 'bar';
    }

    isLine() {
        return this.type === 'line';
    }

    isPie() {
        return this.type === 'pie';
    }

    getLabel() {
        return this.label;
    }

    getData() {
        return this.data;
    }

    isLoaded() {
        return this.loaded;
    }

    getAxisKeys() {
        return this.keys;
    }
};

export default GraphData;