class Surfspot
  include DataMapper::Resource
  
  property :id, Serial
  property :name, String, :nullable => false
  property :description, Text
  property :longitude, Float, :nullable => false
  property :latitude, Float, :nullable => false
  property :region, String
  property :town, String
  property :postcode, Integer
  property :state, String, :nullable => false

  validates_is_unique(:name)

  # Does not work and I can't figure out why. I'm going to try and do it in javascript.
  # before :save, :format_coordinates
  # def format_coordinates
  #   self.longitude = self.longitude.to_s.slice(0..10).to_f
  #   self.latitude = self.latitude.to_s.slice(0..10).to_f
  # end

end
