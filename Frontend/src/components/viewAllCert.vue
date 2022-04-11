<template>
<LoginNavBar/>
  <div>
    <h1>All Certificates Issued</h1>
    <table>
      <thead>
        <th>Id</th>
        <th>Name</th>
        <th>Course</th>
        <th>Email</th>
        <th>Roll Number</th>
        <th>date</th>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item">
          <td>{{ item.cert._id }}</td>
          <td>{{ item.cert.name }}</td>
          <td>{{ item.cert.course }}</td>
          <td>{{ item.cert.email }}</td>
          <td>{{ item.cert.rollNo }}</td>
          <td>{{ item.cert.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LoginNavBar from './LoginNavBar.vue'
import axios from "axios";
export default {
  name: "viewAllCert",
  components:{
        LoginNavBar
    },
  data() {
    return {
      list: [],
    };
  },
  async mounted() {
    let result = await axios.get("http://localhost:4000/certs/");
    this.list = result.data.users;
  },
};
</script>

<style scoped>
h1 {
  color: red;
}
table {
  width: 99vw;
}
th,
td,h1 {
  padding: 15px;
  text-align: center;
}
thead,
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:nth-child(odd) {
  background-color: #ffffff;
}
</style>