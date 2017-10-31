import Component from '@ember/component';

const BlogPostComponent = Component.extend({});

BlogPostComponent.reopenClass({
  positionalParams: ['imageURL', 'name'] //positional params
});

export default BlogPostComponent;