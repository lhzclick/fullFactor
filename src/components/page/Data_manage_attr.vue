
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="elCard">
          <el-table
            :data="table_data"
            header-cell-class-name="tableHead"
            cell-class-name="tableBody"
            :row-class-name="tableRowClassName"
            class="tableBorderWrap"
            :max-height="tableHeight"
          >
            <el-table-column align="center" prop="attrCode" label="属性编码" width="120" fixed></el-table-column>
            <el-table-column align="center" prop="attrName" label="属性名称" width="120">
              <template slot-scope="scope">
                <div>
                  <el-input v-if="!scope.row.isEdit" v-model="scope.row.attrName"></el-input>
                  <span v-else>{{scope.row.attrName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="attrAbbrName" label="属性简称" width="120">
              <template slot-scope="scope">
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.attrAbbrName"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.attrAbbrName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="attrDesc" label="属性描述" width="120">
              <template slot-scope="scope">
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.attrDesc"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.attrDesc}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="attrValueType" label="属性值类型" width="150">
              <template slot-scope="scope">
                <div>
                  <el-select
                    v-show="!scope.row.isEdit"
                    v-model="scope.row.attrValueType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in attrValueType"
                      :key="item.typeId"
                      :label="item.typeName"
                      :value="item.typeName"
                    ></el-option>
                  </el-select>
                  <span v-show="scope.row.isEdit">{{scope.row.attrValueType}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="attrValueLen" label="属性值长度" width="150">
              <template slot-scope="scope">
                <div>
                  <el-input-number
                    v-model="scope.row.attrValueLen"
                    v-show="!scope.row.isEdit"
                    controls-position="right"
                    :min="0"
                    :max="100000"
                  ></el-input-number>
                  <span v-show="scope.row.isEdit">{{scope.row.attrValueLen}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="attrValuePrec" label="属性值精度" width="150">
              <template slot-scope="scope">
                <div>
                  <el-input-number
                    v-model="scope.row.attrValuePrec"
                    v-show="!scope.row.isEdit"
                    controls-position="right"
                    :min="0"
                    :max="100000"
                  ></el-input-number>
                  <span v-show="scope.row.isEdit">{{scope.row.attrValuePrec}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="timeLen" label="时间长度" width="150">
              <template slot-scope="scope">
                <div>
                  <el-input-number
                    v-model="scope.row.timeLen"
                    v-show="!scope.row.isEdit"
                    controls-position="right"
                    :min="0"
                    :max="100000"
                  ></el-input-number>
                  <span v-show="scope.row.isEdit">{{scope.row.timeLen}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="timeUnit" label="时间单位" width="150">
              <template slot-scope="scope">
                <div>
                  <el-select
                    v-show="!scope.row.isEdit"
                    v-model="scope.row.timeUnit"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in timeUnit"
                      :key="item.typeId"
                      :label="item.typeName"
                      :value="item.typeName"
                    ></el-option>
                  </el-select>
                  <span v-show="scope.row.isEdit">{{scope.row.timeUnit}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="measureUnit" label="度量单位" width="120">
              <template slot-scope="scope">
                <div>
                  <el-input v-show="!scope.row.isEdit" v-model="scope.row.measureUnit"></el-input>
                  <span v-show="scope.row.isEdit">{{scope.row.measureUnit}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <span style="color:#2367CD">
                  <el-button
                    size="small"
                    @click.native.prevent="edit(scope.$index, scope.row)"
                    type="success"
                    v-show="scope.row.isEdit"
                    plain
                  >修改</el-button>
                  <el-button
                    size="small"
                    @click.native.prevent="edit_success(scope.$index, scope.row)"
                    type="success"
                    v-show="!scope.row.isEdit"
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
  name: "data_manage_attr",
  data() {
    return {
      table_data: [],
      pageNum: 1,
      pageSize: 20,
      total: 10,
      attrValueType: localStorage.attrValueType?JSON.parse(localStorage.attrValueType):[],
      timeUnit: localStorage.timeUnit?JSON.parse(localStorage.timeUnit):[],
      tableHeight: window.innerHeight * 0.75
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
      // 缓存枚举存在
      if (this.attrValueType.length && this.timeUnit.length) {
        this.$axios({
          url: "/attrDesc/queryAttrDesc",
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
            item.attrValueType = this.status(this.attrValueType, item.attrValueType);
            item.timeUnit = this.status(this.timeUnit, item.timeUnit);
          });
        });
      } else {
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
    // 修改
    edit(index, row) {
      row.isEdit = false;
      this.table_data.push(row);
      this.table_data.splice(this.table_data.length - 1, 1);
    },
    edit_success(index, row) {
      row.timeUnit = this.reverseStatus(this.timeUnit, row.timeUnit);
      row.attrValueType = this.reverseStatus(
        this.attrValueType,
        row.attrValueType
      );
      this.$axios({
        url: "/attrDesc/editAttrDesc",
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
      if (row.l) {
        //禁用
      } else {
        //启用
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
