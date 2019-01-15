<template>
  <div class="layout-footer">
    <footer class="footer-content">
      <div class="copyright">
        Copyright
        <svg-icon class="copyright-icon" icon-class="copyright" />
        ***网络科技有限公司
      </div>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .layout-footer{
    background: #f0f2f5;
    padding: 24px 50px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
  }
  .footer-content{
    padding: 0 16px;
    margin: 36px 0 24px;
    text-align: center;
    .copyright{
      color: rgba(0,0,0,.45);
      font-size: 14px;
      .copyright-icon{
        font-size: 18px;
      }
      *{
        display: inline-block;
      }
    }
  }
</style>

