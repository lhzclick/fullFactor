<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="mgb20">
          <div class="tools">
            <a href="./file/数据源表导入格式模板.xlsx"><el-button size="medium" type="text">下载导入模板</el-button></a>
            <el-upload
              class="upload"
              action="demo"
              :show-file-list="false"
              :file-list="fileList"
              :http-request="upload"
            >
              <el-button  type="primary">数据源导入</el-button>
            </el-upload>
          </div>
          <el-table
            :data="table_data"
            header-cell-class-name="tableHead"
            cell-class-name="tableBody"
            :row-class-name="tableRowClassName"
            class="tableBorderWrap"
            :max-height="tableHeight"
          >
            <el-table-column align="center"  prop="index" label="序号"></el-table-column>
            <el-table-column align="center"  prop="fileId" label="导入ID"></el-table-column>
            <el-table-column align="center"  prop="fileName" label="导入名称"></el-table-column>
            <el-table-column align="center"  prop="createDt" label="导入时间"></el-table-column>
            <el-table-column align="center"  prop="handleStatus" label="状态"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <span style="color:#2367CD" @click="toDetail(scope.$index, scope.row)">
                  <el-button size="medium" type="text">详情</el-button>
                </span>
              </template>
            </el-table-column>
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
  name: "data_init_source",
  data() {
    return {
      table_data: [],
      pageNum: 1,
      pageSize: 20,
      total: 10,
      fileList: [],
      handleStatus:localStorage.handleStatus?JSON.parse(localStorage.handleStatus):[],
      tableHeight:window.innerHeight * 0.7
    };
  },
  components: {},
  mounted() {
    this.getData()
  },
  computed: {},
  created() {},
  activated() {},
  deactivated() {},
  methods: {
    getData() {
      if(this.handleStatus.length){
        this.$axios({
          url: "/etlDsDesc/queryEtlDsDescFile",
          method: "POST",
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.total = res.total;
          this.table_data = res.list;
          this.table_data.map((item, i) => {
            item.index = i + 1;
            item.handleStatus = this.status(
              this.handleStatus,
              item.handleStatus
            );
          });
        });
      }else{
        this.$alert("登录信息过期，请重新登录");
      }
        
    },
    //	表格隔行变色
		tableRowClassName({
			row,
			rowIndex
		}) {
			if (rowIndex % 2 === 1) {
				return 'warning-row'
			}
			return ''
		},
    //  详情页
    toDetail(index, row) {
      this.$router.push({
        path: "/data_init_source_detail",
        query: { 
          fileId: row.fileId,
          createDt:row.createDt,
          handleStatus:row.handleStatus
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
     
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },
    // 格式化枚举
    status(arr, status) {
      let str = ''
      arr.map((item, i) => {
        if (status == item.typeId) {
          str =  item.typeName;
        }
      })
      return str
    },
    // 文件导入
    upload(file) {
      let formData = new FormData()
      formData.append('file', file.file)
      this.$axios({
          url: "/etlDsDesc/doUpload",
          method: "POST",
          data: formData
        }).then((res)=>{
          this.$message({
            type: 'success',
            message: '导入成功!'
          })
          this.getData();
        }).catch((err) => {
          console.log(err)
        })
    },
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
.pagination{
  display: flex;
  justify-content: end
}
</style>
