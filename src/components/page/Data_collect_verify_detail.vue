
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="mgb20">
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/data_collect_verify' }">数据审核</el-breadcrumb-item>
            <el-breadcrumb-item>数据审核详情</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="tools">
            <div class="time">审核ID：201908053487 提审时间：2019-8-31 14:06:30 审核状态：未审核</div>
            <el-button type="primary" @click="submit">审核</el-button>
          </div>
          <el-table
            :data="table_data"
            header-cell-class-name="tableHead"
            cell-class-name="tableBody"
            :row-class-name="tableRowClassName"
            class="tableBorderWrap"
            @cell-click="cell_click"
          >
            <el-table-column align="center" show-overflow-tooltip prop="a" label="平安银行（000001）"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="b" label="聚源"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="c" label="万得"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="d" label="通联"></el-table-column>
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
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import "../../assets/css/elementChange.css";
export default {
  name: "data_collect_correct_detail",
  data() {
    return {
      table_data: [
        {
          a: "收盘价",
          b: 2,
          c: 3,
          d: 4,
          id: 0
        },
        {
          a: "最高价",
          b: 2,
          c: 3,
          d: 4,
          id: 1
        },
        {
          a: "最低价",
          b: 2,
          c: 3,
          d: 4,
          id: 2
        }
      ],
      currentPage: 1
    };
  },
  components: {},
  mounted() {
    console.log(this.$route.query);
  },

  computed: {},
  created() {},
  activated() {
    $(".tableBorderWrap tr")
      .find("td")
      .removeClass("mark");
  },
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
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //点击单元格
    cell_click(a, b, c, d) {
      let arr = this.table_data.filter((item, i) => {
        return item.a == $(c).text();
      });
      // 排除第一列
      if (arr.length == 0) {
        $(".tableBorderWrap tr")
          .eq(a.id + 1)
          .find("td")
          .removeClass("mark");
        $(c).addClass("mark");
      }
    },
    // 提交审核
    submit() {
      if (
        this.table_data.length == $(".tableBorderWrap").find(".mark").length
      ) {
        let arr = []; //提交的数据
        $(".tableBorderWrap")
          .find(".mark")
          .map((i, ele) => {
            arr.push({
              type: $(ele)
                .parent()
                .children()
                .eq(0)
                .text(),
              source: $(ele).index(),
              value: $(ele).text()
            });
          });

        console.log(arr);
        if (arr !== arr) {
          this.$alert("审核成功").then(() => {
            this.$router.push({
              path: "/data_collect_verify"
            });
          });
        } else {
          this.$confirm("审核数据与提交审核数据选择不符！", "审核不通过", {
            confirmButtonText: "打回修正",
            cancelButtonText: "作废",
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "info",
                message: "作废!"
              });
              this.$router.push({
              path: "/data_collect_verify"
            });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "打回修正"
              });
              this.$router.push({
              path: "/data_collect_verify"
            });
            });
        }
      } else {
        this.$alert("您尚有数据未选择数据源");
      }
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
.tools {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
