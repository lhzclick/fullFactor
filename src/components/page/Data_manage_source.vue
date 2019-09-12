
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
            <el-table-column align="center" prop="dsCode" label="数据源编码" width="120" fixed>
            </el-table-column>
            <el-table-column align="center" prop="dsRemark" label="数据源名称" width="120">
              <template slot-scope="scope">
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.dsRemark"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.dsRemark}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dsDbType" label="数据库类型"  width="120">
              <template slot-scope="scope">
                <div>
                  <el-select v-show="!scope.row.isEdit" v-model="scope.row.dsDbType"  placeholder="请选择">
                    <el-option
                      v-for="item in dsDbType"
                      :key="item.typeId"
                      :label="item.typeName"
                      :value="item.typeName">
                    </el-option>
                  </el-select>
                  <span v-show="scope.row.isEdit">{{scope.row.dsDbType}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dsConnectUrl" label="数据库url" width="200">
              <template slot-scope="scope">
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.dsConnectUrl"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.dsConnectUrl}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dsUsername" label="数据库用户名"  width="120">
              <template slot-scope="scope">
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.dsUsername"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.dsUsername}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dsPassword" label="数据库密码"  width="200">
              <template slot-scope="scope">
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.dsPassword"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.dsPassword}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dsDriver" label="数据库驱动" width="200">
              <template slot-scope="scope">
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.dsDriver"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.dsDriver}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dsStatus" label="状态"  >
              <template slot-scope="scope">
                <span size="medium" type="text">{{scope.row.dsStatus==1?'启用中':'禁用中'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <span style="color:#2367CD">
                  <el-button
                    size="small"
                    @click.native.prevent="on_off(scope.$index, scope.row)"
                    type="primary"
                    plain
                  >{{!scope.row.dsStatus?'启用':'禁用'}}</el-button>
                  <el-button
                    size="small"
                    @click.native.prevent="edit(scope.$index, scope.row)"
                    type="success"
                    v-show="scope.row.isEdit&&!scope.row.dsStatus"
                    plain
                  >修改</el-button>
                  <el-button
                    size="small"
                    @click.native.prevent="edit_success(scope.$index, scope.row)"
                    type="success"
                    v-show="!scope.row.isEdit&&!scope.row.dsStatus"
                    plain
                  >完成修改</el-button>
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
import { setTimeout } from "timers";
export default {
  name: "data_manage_source",
  data() {
    return {
      table_data: [],
      pageNum: 1,
      pageSize: 20,
      total: 10,
      dsDbType: localStorage.dbType?JSON.parse(localStorage.dbType):[],
      tableHeight:window.innerHeight * 0.75
    };
  },
  components: {},
  mounted() {
    this.getData();
  },

  computed: {},
  created() {},
  activated() {},
  deactivated() {},
  methods: {
    getData() {
      if(this.dsDbType.length){
        this.$axios({
          url: "/etlDsDesc/queryEtlDsDesc",
          method: "POST",
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.total = res.total;
          this.table_data = res.list;
          this.table_data.map((item, i) => {
            item.isEdit = true;
            item.dsDbType = this.status(
              this.dsDbType,
              item.dsDbType
            )
          });
        });
      }else{
        this.$alert("登录信息过期，请重新登录");
      }
        
    },
    //	表格隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      }
      return "";
    },
    //  修改
    edit(index, row) {
      row.isEdit = false;
      this.table_data.push(row);
      this.table_data.splice(this.table_data.length - 1, 1);
    },
    edit_success(index, row) {
      row.dsDbType = this.reverseStatus(this.dsDbType,row.dsDbType)
      this.$axios({
        url: "/etlDsDesc/editEtlDsDesc",
        method: "POST",
        data: row
      }).then(res => {
        this.getData();
        row.isEdit = true;
        this.table_data.push(row);
        this.table_data.splice(this.table_data.length - 1, 1);
      });
    },
    on_off(index, row) {
      row.dsDbType = this.reverseStatus(this.dsDbType,row.dsDbType)
      if (!row.dsStatus) {
        //禁用中，调用启用接口
        this.$axios({
          url: "/etlDsDesc/openEtlDsDesc",
          method: "POST",
          data: row
        }).then(res => {
          this.getData();
        });
      } else {
        //启用中，调用禁用接口
        this.$axios({
          url: "/etlDsDesc/closeEtlDsDesc",
          method: "POST",
          data: row
        }).then(res => {
          this.getData();
        });
      }
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getData();
    },
    
    // 格式化枚举
    status(arr, status) {
      let str = "";
      arr.map((item, i) => {
        if (status == item.typeId) {
          str = item.typeName;
        }
      });
      return str;
    },
    // 反向格式化枚举
    reverseStatus(arr, status) {
      let str;
      arr.map((item, i) => {
        if (item.typeName == status) {
          str = item.typeId;
        }
      });
      return str;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.pagination {
  display: flex;
  justify-content: end;
}
</style>
