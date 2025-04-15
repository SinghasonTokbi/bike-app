<script setup>

    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    const payments = ref([])
    const getPayments = async()=>{
        try{
            const response = await axios.get('/payment')
            payments.value = response.data
            console.log(payments.value)


        }catch(err){
            console.log(err)
        }
    }

    onMounted(()=>{
        getPayments()
    })

    

</script>
<template>
    <section class="container">
      
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>Reference Id</th>
                <th>Booking Id</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
                
              
                
               
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in payments" :key="p.transaction_id">
                <td>{{p.transaction_id}}</td>
                <td>{{p.ref_id}}</td>
                <td>{{p.booking_id}}</td>
                <td>{{p.amount}}</td>
                <td>{{p.status}}</td> 
                <td><span v-if="p.method">{{p.method}}</span><span v-else>null</span></td>
               
               
            </tr>
        </tbody>
    </table>
</section>
</template>
<style scoped>

container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px; 
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse; 
    margin-bottom: 20px;
    padding-top: 20px;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ccc; 
    padding: 12px 15px; 
    text-align: left;
}

th {
    background-color: #f4f4f4; 
    font-weight: bold;
    color: #333; 
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9; 
}

tbody tr:hover {
    background-color: #e0f7fa;
}</style>