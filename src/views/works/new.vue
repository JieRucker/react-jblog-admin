<style lang="scss" scoped>
  .file {
    opacity: 0;
    position: absolute;
    top: -999px;
  }

  .upload-md {
    margin-left: 10px;
    cursor: pointer;
    vertical-align: middle
  }

  .works-content {
    margin-bottom: 20px;
  }
</style>

<style lang="scss">
  .works-content {
    li {
      list-style: initial;
    }
  }
</style>

<template>
  <div>
    <Form :label-width="60">
      <FormItem label="标题：">
        <Input v-model="works.title" placeholder="请输入名称" style="width: 50%"></Input>
      </FormItem>
      <FormItem label="标签：">
        <Tag type="dot" :color="works.tag_clear ? 'blue' : ''" @click.native="onChangeTagsClear">无</Tag>
        <Tag type="dot" :color="item.checked ? 'blue' : ''" v-for="(item,index) in tagList" :key="index"
             @click.native="onChangeTags(index)">{{item.tags_name}}
        </Tag>
      </FormItem>
      <FormItem label="状态：">
        <Select v-model="works.state" style="width: 50%">
          <Option :value="item.value" :key="item.value" v-for="item in stateOptions">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="封面：">
        <Input v-model="works.cover" placeholder="请输入图片地址" style="width:50%"></Input>
      </FormItem>
      <FormItem label="描述：">
        <Input v-model="works.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述内容"
               style="width: 50%"></Input>
      </FormItem>
    </Form>
    <div class="works-content">
      <mavon-editor ref="mavonEditor" v-model="works.content" :ishljs="true"></mavon-editor>
    </div>

    <input type="file" id="uploadMD" @change="getFile" class="file">
    <Button type="primary" @click="publishHandler">发表</Button>
    <label for="uploadMD" class="upload-md">上传MD</label>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';

  export default {
    name: "create-works",
    components: {
      mavonEditor
    },
    data() {
      return {
        works: {
          title: '', /*标题*/
          tags: [], /*标签*/
          state: 1, /*状态*/
          cover: '', /*封面地址*/
          desc: '', /*文章描述*/
          tag_clear: true,
          create_time: '',
          update_time: '',
          content: ''
        },
        tagList: [],
        stateOptions: [
          {
            name: '发布',
            value: 1
          },
          {
            name: '草稿',
            value: 0
          }
        ]
      }
    },
    /*directives: {
      markdown: {
        inserted(el) {
          simplemde = new SimpleMDE({
            element: el
          });
        }
      }
    },*/
    mounted() {
      this.getTagList();
      if (this.$route.query._id) this.getWorksById();
    },
    methods: {
      getNavigation() {
        let navigationContent;
        let navigation_list = [];
        let mavonEditor = this.$refs.mavonEditor;
        navigationContent = mavonEditor.$refs.navigationContent;
        navigationContent.innerHTML = mavonEditor.d_render;

        let nodes = navigationContent.children;
        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            judageH(nodes[i], i, nodes)
          }
        }

        function judageH(node, i, nodes) {
          let reg = /^H[1-6]{1}$/;
          if (reg.exec(node.tagName)) {
            navigation_list.push({
              name: node.innerText,
              id: node.childNodes[0].getAttribute('id')
            })
          }
        }

        return navigation_list
      },
      getFile(e) {
        let self = this;
        let obj = e.target || null;
        let fileName = obj.files[0].name;
        let fileReader = new FileReader();
        if (fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase() !== 'md') {
          return this.$Message.info('请上传markdown的文件');
        }
        fileReader.readAsText(obj.files[0]);
        fileReader.onload = function () {
          let result = this.result;
          try {
            self.works.content = result;
          } catch (e) {
            console.error("Storage failed: " + e);
          }
        }
      },
      /*发表*/
      async publishHandler() {
        let res;
        let params = {};
        this.works.tags = !this.works.tag_clear ? this.tagList.map(m => m.checked ? m._id : null).filter(item => item) : [];
        params = {
          _id: this.$route.query._id ? this.$route.query._id : '',
          works_content: this.works.content,
          // works_render_content: this.$refs.mavonEditor.d_render.replace(/[\r\n]/g, ""),
          works_render_content: this.$refs.mavonEditor.d_render,
          works_cover: this.works.cover,
          // works_create_time: this.works.create_time,
          works_desc: this.works.desc,
          works_state: this.works.state,
          works_tags: this.works.tags,
          works_title: this.works.title,
          works_navigation: JSON.stringify(this.getNavigation())
          // works_update_time: this.works.update_time
        };

        res = !this.$route.query._id ? await this.$api.worksInterface.addWorks(params) : await this.$api.worksInterface.alterWorks(params);
        let {code, msg, data = []} = res.data;
        return this.$Message.info(msg)
      },
      async getWorksById() {
        let res = await this.$api.worksInterface.getWorksById({_id: this.$route.query._id});
        let {code, data} = res.data;
        if (code === 200 && data.length) {
          let [a] = data;
          this.works.title = a.works_title;
          this.works.state = a.works_state;
          this.works.cover = a.works_cover;
          this.works.desc = a.works_desc;
          this.works.create_time = a.works_create_time;
          this.works.update_time = a.works_update_time;
          this.works.content = a.works_content;
          if (a.works_tags.length) {
            this.works.tag_clear = false;
            this.tagList.map(item => {
              a.works_tags.map(m => (item._id === m._id) && (item.checked = true))
            })
          }
        }
      },
      async getTagList() {
        let res = await this.$api.tagsInterface.getTagsList();
        let {works_num_list = [], tags_list = []} = res.data.data;
        tags_list.forEach(item => {
          item.checked = false;
          let temp = works_num_list.find(i => {
            return i._id === item._id;
          });
          item.tags_works_num = temp == null ? 0 : temp.count;
        });

        this.tagList = tags_list.sort((a, b) => {
          return a.tags_works_num < b.tags_works_num;
        });

        this.tagList = tags_list;
      },
      onChangeTagsClear() {
        this.works.tag_clear = !this.works.tag_clear;
        this.tagList.map(m => m.checked = false)
      },
      onChangeTags(index) {
        this.works.tag_clear = false;
        this.tagList[index].checked = !this.tagList[index].checked;
      }
    }
  }
</script>
