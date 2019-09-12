
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="mgb20">
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/data_init_etl' }">ETL数据导入</el-breadcrumb-item>
            <el-breadcrumb-item>ETL数据导入详情</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="time">
            <span>导入时间：{{createDt}}</span>
            <span>状态：{{handleStatus}}</span>
            <!-- <span>备注：SQL执行出错</span>  -->
          </div>
          <el-table
            :data="table_data"
            header-cell-class-name="tableHead"
            cell-class-name="tableBody"
            :row-class-name="tableRowClassName"
            class="tableBorderWrap"
            :max-height="tableHeight"
          >
            <el-table-column align="center" prop="fileId" label="导入ID" width="200"></el-table-column>
            <el-table-column align="center" prop="lineNo" label="行数" width="80"></el-table-column>
            <el-table-column align="center" prop="errorDesc" label="错误描述" width="200"></el-table-column>
            <el-table-column align="center" prop="lineContent" label="行内容"></el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[ 20, 50, 100,200,500]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "../../assets/css/elementChange.css";
export default {
  name: "data_init_etl_detail",
  data() {
    return {
      table_data: [],
      pageNum: 1,
      pageSize: 20,
      total: 10,
      handleStatus:'',
      createDt:'',
      fileId:'',
      tableHeight:window.innerHeight * 0.65
    }
  },
  components: {},
  mounted() {
    this.handleStatus = this.$route.query.handleStatus
    this.createDt = this.$route.query.createDt
    this.fileId= this.$route.query.fileId
    this.getData();
  },

  computed: {},
  created() {
  },
  activated() {
  },
  deactivated() {},
  methods: {
    getData() {
      this.$axios({
          url: "/etlConfig/queryEtlConfigFileError",
          method: "POST",
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            fileId:this.fileId
          }
        }).then(res => {
          this.total = res.total;
          this.table_data = res.list;
        });
    },
    //	表格隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      }
      return "";
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.tools {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.pagination {
  display: flex;
  justify-content: end;
}
.breadcrumb {
  margin-bottom: 20px;
}
.time{
  margin-bottom: 20px;
  display: flex;
  
}
.time span{
    margin-right: 30px;
  }
</style>
