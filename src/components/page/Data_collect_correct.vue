
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="mgb20">
          <div class="tools">
            <!-- <el-button size="medium" type="text">下载导入模板</el-button>
            <el-button type="primary">属性定义表导入</el-button>-->
            <div>
              <span>选择日期：</span>
              <el-date-picker
                v-model="v_time"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="left"
                :unlink-panels="true"
              ></el-date-picker>
              <span class="id">ID：</span>
              <el-input v-model="v_id" class="input_id" placeholder="请输入"></el-input>
            </div>
            <el-button @click="query" type="primary">查询</el-button>
          </div>
          <el-table
            :data="table_data"
            header-cell-class-name="tableHead"
            cell-class-name="tableBody"
            :row-class-name="tableRowClassName"
            class="tableBorderWrap"
          >
            <el-table-column align="center" show-overflow-tooltip prop="a" label="序号"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="b" label="修正ID"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="c" label="所属分类"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="d" label="事件编码"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="e" label="采集时间"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="f" label="修正状态"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <span style="color:#2367CD" @click="toDetail(scope.$index, scope.row)">
                  <el-button size="medium" type="text">修正</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[ 20, 50, 100,200,500]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
        </el-card>
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import "../../assets/css/elementChange.css"
import tool from "lh-tool"
export default {
  name: "data_collect_correct",
  data() {
    return {
      table_data: [
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
          f: 6
        },
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
          f: 6
        },
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
          f: 6
        }
      ],
      currentPage: 4,
      v_time: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      v_id: ""
    };
  },
  components: {},
  mounted() {},

  computed: {},
  created() {},
  activated() {},
  deactivated() {},
  methods: {
    getData() {
      this.$axios({
        url: "/combinatorial/setting/benchmark",
        method: "get",
        data: {
          pageNum: 1,
          pageSize: 10
        }
      }).then(res => {
        // console.log(res)
      });
    },
    //	表格隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      }
      return "";
    },
    //  详情页
    toDetail(index, row) {
      console.log(index, row);
      this.$router.push({
        path:'/data_collect_correct_detail',
        query: {id:index}
      })
    },
    query(){
      console.log(this.v_time,this.v_id)
      console.log(tool.formatDate.format(new Date(this.v_time[0]),'yyyy-MM-dd hh:mm:ss'))
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
  margin-bottom: 20px;
}
.pagination {
  display: flex;
  justify-content: end;
}
.input_id {
  width: 200px;
}
.id{
  margin-left: 20px;
}
</style>
