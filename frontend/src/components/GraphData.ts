import chroma from 'chroma-js';
import { Chart } from 'chart.js';

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

    async init(data: object) {
        this.type = data['chart_type'];

        if (this.type == 'pie') {
            this.data = data['data'];
        } else {
            this.data = {
                axis: 'y',
                datasets: [{
                    data: data['data'],
                }],
                labels: data['labels'],
                
            };
        }

        // generate gradient bars for bar graphs
        if (this.isBar()) {
            this.data['datasets'][0]['backgroundColor'] = this.generateChartColors(data['data'].length);
        }

        this.label = data['label'];

    }

    async getAPIData() {
        return fetch(import.meta.env['VITE_API_URL'] + this.name)
            .then((response) => { return response.json() })
            .then((data) => { 
                this.loaded = true;
                this.init(data);
            })
            .then(() => { return })
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

    getClientData(client : string) {
        if (!client || client.length <= 0 || !this.isPie()) return {};
        console.log(client.length);
        let clientData = this.data[0].dataset[client];
        let data = {
            labels: clientData['project_labels'],
            datasets: [{
                data: clientData['hours'],
                backgroundColor: this.generateChartColors(clientData['hours'].length)
            }]
        }
        return data;
    }

    isLoaded() {
        return this.loaded;
    }

    getAxisKeys() {
        return this.keys;
    }

    getColorScheme() {
        let style = getComputedStyle(document.body);
        let start_var = '';
        let end_var = '';

        if (this.name.includes('client')) {
            // graphs in client section use cool colors
            start_var = '--scheme-cool-dark';
            end_var = '--scheme-cool-light'; 
        } else {
            start_var = '--scheme-warm-dark';
            end_var = '--scheme-warm-light';
        }

        let start = style.getPropertyValue(start_var);
        let end = style.getPropertyValue(end_var);
        start = start.substring(1);
        end = end.substring(1);

        return [start, end];

    }

    generateChartColors(dataLength: number) {
        let color_scheme = this.getColorScheme();

        return chroma.scale(color_scheme).gamma(0.5).colors(dataLength);
        
    }

    /**
     * @see https://www.chartjs.org/docs/latest/samples/advanced/linear-gradient.html
     */
    generateLineGradient(ctx: any, width: number, height: number) {
        let gradient = ctx.createLinearGradient(0, 0, 0, height);

        let color_scheme = this.getColorScheme();
        let scale = chroma.scale(color_scheme).colors(3);

        gradient.addColorStop(0, color_scheme[0]);
        // gradient.addColorStop(0.5, scale[1])
        gradient.addColorStop(0.5, color_scheme[1]);
        gradient.addColorStop(1, color_scheme[1]);

        return gradient;
    }

    getClients() {
        return this.data[0].client_list;
    }
};

export default GraphData;