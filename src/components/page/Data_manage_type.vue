
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="mgb20">
          <el-table
            :data="table_data"
            header-cell-class-name="tableHead"
            cell-class-name="tableBody"
            :row-class-name="tableRowClassName"
            class="tableBorderWrap"
            :max-height="tableHeight"
          >
            <el-table-column align="center"  prop="etlEventTypeCode" label="事件类型编码"  fixed>
            </el-table-column>
            <el-table-column align="center"  prop="etlEventTypeName" label="事件类型名称" >
              <template slot-scope="scope" >
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.etlEventTypeName"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.etlEventTypeName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center"  prop="etlEventTypeDesc" label="事件类型描述"  >
              <template slot-scope="scope" >
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.etlEventTypeDesc"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.etlEventTypeDesc}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="extractJobStatus"  label="状态"  >
              <template slot-scope="scope">
                  <span size="medium" type="text">{{scope.row.extractJobStatus?'启用中':'禁用中'}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="150" fixed="right">
              <template slot-scope="scope" >
                <span style="color:#2367CD" >
                  <el-button size="small" @click.native.prevent="on_off(scope.$index, scope.row)" type="primary" plain>{{!scope.row.extractJobStatus?'启用':'禁用'}}</el-button>
                  <el-button size="small" @click.native.prevent="edit(scope.$index, scope.row)" type="success" v-show="scope.row.isEdit&&!scope.row.extractJobStatus" plain>修改</el-button>
                  <el-button size="small" @click.native.prevent="edit_success(scope.$index, scope.row)" type="success"  v-show="!scope.row.isEdit&&!scope.row.extractJobStatus" plain>完成修改</el-button>
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
import { setTimeout } from 'timers';
export default {
  name: "data_manage_type",
  data() {
    return {
      table_data: [],
      pageNum: 1,
      pageSize:20,
      total:10,
      tableHeight:window.innerHeight * 0.75
    };
  },
  components: {},
  mounted() {
    this.getData()
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
        url: "/eventType/queryEventType",
        method: "POST",
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.total = res.total
        this.table_data = res.list
        this.table_data.map((item,i)=>{
          item.isEdit = true 
        })
      });
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
    //  修改
    edit(index, row) {
      row.isEdit = false
      this.table_data.push(row)
      this.table_data.splice(this.table_data.length-1,1)
    },
    edit_success(index, row) {
      this.$axios({
        url: "/eventType/editEventType",
        method: "POST",
        data: row
      }).then(res => {
        this.getData()
        row.isEdit = true
        this.table_data.push(row)
        this.table_data.splice(this.table_data.length-1,1)
      })
    },
    on_off(index, row){
      if(!row.extractJobStatus){  //禁用中，调用启用接口
        this.$axios({
          url: "/eventType/openEventType",
          method: "POST",
          data: row
        }).then(res => {
          this.getData()
        })  
      }else{      //启用中，调用禁用接口
        // console.log(1)
        this.$axios({
          url: "/eventType/closeEventType",
          method: "POST",
          data: row
        }).then(res => {
          this.getData()
        })  
      }
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val
      this.getData()
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.pagination{
  display: flex;
  justify-content: end
}
</style>
