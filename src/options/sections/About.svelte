<script>
  import { Code, Header, P, A, Subheader, Icon } from "@lib/components";
</script>

<Header>Boxer</Header>

<P>
  Boxer is a browser extension that allows you to register aliases in the form
  of a series of keywords for sites you frequent often. Typing these aliases
  into Boxer will bring you exactly where you want to go!
</P>

<Header>Getting Started</Header>

<P>Let's add our first alias!</P>

<P>
  In this tutorial we'll use
  <Code>https://github.com/MJez29/boxer</Code>
  (the repository for the code of this extension) as our example site to alias
  but these steps can be applied to any site of your choice.
</P>

<Subheader>Adding an Alias from a Webpage</Subheader>
<P>
  Lets navigate to
  <A href="https://github.com/MJez29/boxer" newTab>
    https://github.com/MJez29/boxer
  </A>
  in a new tab. Click on the boxer icon in the chrome menu bar (or use Alt+B).
  This will toggle the Boxer extension popup like so.
</P>
[Insert image]
<P>
  Go on and click the
  <Code>Add alias</Code>
  button. We've created our first alias!
</P>
<Subheader>Viewing and Managing Aliases</Subheader>
<P>
  Click on the
  <Code>My aliases</Code>
  button in the Boxer popup to be brought to the list of your extensions.
  Currently you should have only one alias:
  <Code>github mjez29 boxer</Code>
  linking to
  <Code>https://github.com/mjez29/boxer</Code>
  . The name
  <Code>github mjez29 boxer</Code>
  was automatically generated from the page we wanted to alias but is a little
  verbose. Click on the pencil icon to rename it to
  <Code>boxer github</Code>
  and then the pencil icon to save your changes!
</P>
<Subheader>Using an Alias</Subheader>
<P>
  Now that we've created our alias it's time to put it to use to speed up our
  browsing. Click into the search bar to focus it. Type a slash (
  <Code>/</Code>
  ) followed by a space or a tab, this activates Boxer. Then, begin typing the
  alias name. You should see our alias as the first result! Pressing enter will
  bring you to our alias' url.
</P>
<Subheader>Adding more Aliases</Subheader>
<P>
  Now that you're a pro at using Boxer it's time to add more aliases! On the
  aliases page you can click the
  <Code>Import bookmarks</Code>
  or
  <Code>Import history</Code>
  buttons to import your bookmarks or sites that you visit often. You can also
  upload alias packs (files ending in
  <Code>.json</Code>
  ) containing related aliases.
</P>

<Header>Becoming a Power User</Header>

<P>
  Now that you've gotten the hang of Boxer these tips and tricks can help you
  navigate the web with Boxer even faster.
</P>

<Subheader>Focusing the Search Box</Subheader>

<P>
  To jump to a new site without having to leave your keyboard use Ctrl+L to move
  your cursor to the browser search box. Note that this shortcut is built into
  Chrome so you will still have to enter
  <Code>/</Code>
  to use Boxer.
</P>

<Subheader>Toggling the Extension Popup</Subheader>

<P>
  Use
  <Code>Alt+B</Code>
  to toggle the Boxer extension popup on any webpage to quickly give it an
  alias.
</P>

<Subheader>Navigating to the Aliases Page</Subheader>

<P>
  When in Boxer mode inside the search bar, pressing the Enter key without any
  input will bring you to your aliases page. This can be done quickly through
  the following key combination
  <Code>Ctrl + L</Code>
  <Icon name="long-arrow-alt-right" />
  <Code>/</Code>
  <Icon name="long-arrow-alt-right" />
  <Code />
  <Icon name="long-arrow-alt-right" />
  <Code>[Enter]</Code>
</P>

<Header>Motivation Behind Boxer</Header>

<P>
  As a software developer I like to type. I try to use my keyboard as much as
  possible to navigate through my computer, especially the web. As such, I
  haven't created a bookmark in years and my primary method of navigating to a
  site is by typing a portion of their url and following the first search result
  containing my target domain. If I'm lucky this will bring me exactly where I
  want to go but, if not, I will have to navigate around the site a little bit
  to get exactly where I want to go. To minimize those seconds wasted I created
  Boxer.
</P>

<P>
  Boxer allows me to continue navigating through typing but instead of having to
  sift through my entire browser history to predict where I want to go, Boxer
  already has a curated list of probable places I'd like to go.
</P>

<Header>Help! Something Doesn't Work!</Header>
<P>
  Please file an issue at
  <A href="https://github.com/MJez29/boxer/issues" newTab>
    https://github.com/MJez29/boxer/issues
  </A>
  and we'll look into it as soon as possible.
</P>
