<template>
  <MDBContainer>
    <MDBRow class="row">
      <MDBCol md="8">
        <ArticlesView />
      </MDBCol>
      <MDBCol md="4">
        <Affiliate>
          <div class="text-center">
            <Sponsored />
          </div>
          <iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
            style="width: 120px; height: 240px" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"
            src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=DE&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=codingfundi-21&language=en_GB&marketplace=amazon&region=DE&placement=B0CHWWM3JH&asins=B0CHWWM3JH&linkId=b5a62a2de86693abd709a282c8a58698&show_border=true&link_opens_in_new_window=true"></iframe>
        </Affiliate>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</template>


<script setup lang="ts">
import { MDBContainer, MDBCol, MDBRow } from "mdb-vue-ui-kit";


// useServerSeoMeta({
//   title: 'Coding Fundi',
//   ogTitle: 'My Amazing Site',
//   description: 'codingfundi, tutorials, coding, programming, software development, web development, software engineering, web design, web development, coding tutorials, coding tutorials for beginners, coding tutorials for beginners',
//   ogDescription: 'codingfundi, tutorials, coding, programming, software development, web development, software engineering, web design, web development, coding tutorials, coding tutorials for beginners, coding tutorials for beginners',
//   ogImage: '//images.ctfassets.net/svxuef11w26o/7mfsf7SwQGvYwVznGqHqh5/44f1a859ed4daaa1c874c01b042c76b9/pexels-realtoughcandycom-11035366.jpg',
//   twitterCard: 'summary_large_image',
//   twitterSite: '@codingfundi',
//   twitterCreator: '@codingfundi',
//   twitterTitle: 'Coding Fundi',
//   twitterDescription: 'codingfundi, tutorials, coding, programming, software development, web development, software engineering, web design, web development, coding tutorials, coding tutorials for beginners, coding tutorials for beginners',
//   twitterImage: '//images.ctfassets.net/svxuef11w26o/7mfsf7SwQGvYwVznGqHqh5/44f1a859ed4daaa1c874c01b042c76b9/pexels-realtoughcandycom-11035366.jpg',
// })
</script>

