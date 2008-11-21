require File.join(File.dirname(__FILE__), '..', 'spec_helper.rb')

given "a surfspot exists" do
  Surfspot.all.destroy!
  request(resource(:surfspots), :method => "POST", 
    :params => { :surfspot => { :id => nil }})
end

describe "resource(:surfspots)" do
  describe "GET" do
    
    before(:each) do
      @response = request(resource(:surfspots))
    end
    
    it "responds successfully" do
      @response.should be_successful
    end

    it "contains a list of surfspots" do
      pending
      @response.should have_xpath("//ul")
    end
    
  end
  
  describe "GET", :given => "a surfspot exists" do
    before(:each) do
      @response = request(resource(:surfspots))
    end
    
    it "has a list of surfspots" do
      pending
      @response.should have_xpath("//ul/li")
    end
  end
  
  describe "a successful POST" do
    before(:each) do
      Surfspot.all.destroy!
      @response = request(resource(:surfspots), :method => "POST", 
        :params => { :surfspot => { :id => nil }})
    end
    
    it "redirects to resource(:surfspots)" do
      @response.should redirect_to(resource(Surfspot.first), :message => {:notice => "surfspot was successfully created"})
    end
    
  end
end

describe "resource(@surfspot)" do 
  describe "a successful DELETE", :given => "a surfspot exists" do
     before(:each) do
       @response = request(resource(Surfspot.first), :method => "DELETE")
     end

     it "should redirect to the index action" do
       @response.should redirect_to(resource(:surfspots))
     end

   end
end

describe "resource(:surfspots, :new)" do
  before(:each) do
    @response = request(resource(:surfspots, :new))
  end
  
  it "responds successfully" do
    @response.should be_successful
  end
end

describe "resource(@surfspot, :edit)", :given => "a surfspot exists" do
  before(:each) do
    @response = request(resource(Surfspot.first, :edit))
  end
  
  it "responds successfully" do
    @response.should be_successful
  end
end

describe "resource(@surfspot)", :given => "a surfspot exists" do
  
  describe "GET" do
    before(:each) do
      @response = request(resource(Surfspot.first))
    end
  
    it "responds successfully" do
      @response.should be_successful
    end
  end
  
  describe "PUT" do
    before(:each) do
      @surfspot = Surfspot.first
      @response = request(resource(@surfspot), :method => "PUT", 
        :params => { :surfspot => {:id => @surfspot.id} })
    end
  
    it "redirect to the article show action" do
      @response.should redirect_to(resource(@surfspot))
    end
  end
  
end

