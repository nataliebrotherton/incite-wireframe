<script lang="ts">

const OVERVIEW_API_URL = import.meta.env.VITE_API_URL + 'overview';

export default {
    data() {
        return {
            overviewData: []
        }
    },
    created: 
        function() { 
            this.getData();
        },
    methods: {
        async getData() {
            fetch(OVERVIEW_API_URL)
            .then((response) => {return response.json()})
            .then((data) => {this.overviewData = data})
            .catch((err) => console.error(err))
        },
        getHoursPhrase(dataLabel: any, itemData: any) {
            if (dataLabel == 'month_pto_hours') {
                return itemData['hours'] + ' hours logged';
            }

            return itemData['hours'] + ' hours billed';
        }
    }
}
</script>

<template>
    <p class="section-title">Overview</p>
    <div id="overview">
        <div class="card" v-for="(data, id) in overviewData" >
            <p class="label">{{ data['label'] }}</p>
            <p class="value">{{ data['value'] }}</p>
            <p class="hours"> {{ getHoursPhrase(id, data) }} </p>
        </div>
    </div>

</template>

<style lang="scss">
#overview {
    display: flex;
    flex-direction: row;

    .card {
        width: 239px;
        height: 223px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        .label {
            font-size: 28px;
            color: var(--text-title-2);
            white-space: nowrap;
        }

        .value {
            white-space: normal;
            width: 239px;
            font-size: 2rem;
            text-align: center;
            color: var(--overview-text-highlight);
        }

        .hours {
            font-size: 18px;
            color: var(--text-title-3);
        }
    }
}


</style>