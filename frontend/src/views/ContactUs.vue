<script setup>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    const contacts = ref([])
    const getContacts = async()=>{
        try{
            const response = await axios.get('/contacts')
            contacts.value = response.data
            console.log(contacts.value)

        }catch(err){
            console.log(err)
        }
    }

    const deleteContact = async(id)=>{
        try{
            console.log("erer")
            const response = await axios.delete(`/custenquire/${id}`)
            alert("1 row deleted")
            getContacts()
        }catch(err){
            console.log(err)
            alert("cannot delete")
        }
    }

    onMounted(()=>{
        getContacts()
    })




</script>
<template>
    <section class="container">

       
    <table>
        <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Message</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c in contacts">
                <td>{{c.firstname}}</td>
                <td>{{ c.lastname }}</td>
                <td>{{c.phoneno}}</td>
                <td>{{c.email}}</td>
                <td>{{c.messages}}</td>
                <td ><span class="delete" @click="deleteContact(c.no_id)">delete</span></td>
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


.delete{
    color: red;
    cursor: pointer;
}

.delete:hover{
    text-decoration: underline;
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