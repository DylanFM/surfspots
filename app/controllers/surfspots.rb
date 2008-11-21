class Surfspots < Application
  # provides :xml, :yaml, :js

  def index
    @surfspots = Surfspot.all
    display @surfspots
  end

  def show(id)
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    display @surfspot
  end

  def new
    only_provides :html
    @surfspot = Surfspot.new
    display @surfspot
  end

  def edit(id)
    only_provides :html
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    display @surfspot
  end

  def create(surfspot)
    @surfspot = Surfspot.new(surfspot)
    if @surfspot.save
      redirect resource(@surfspot), :message => {:notice => "Surfspot was successfully created"}
    else
      message[:error] = "Surfspot failed to be created"
      render :new
    end
  end

  def update(id, surfspot)
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    if @surfspot.update_attributes(surfspot)
       redirect resource(@surfspot)
    else
      display @surfspot, :edit
    end
  end

  def destroy(id)
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    if @surfspot.destroy
      redirect resource(:surfspots)
    else
      raise InternalServerError
    end
  end

end # Surfspots