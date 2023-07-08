if true # << Make true to use this script, false to disable.
#===============================================================================
#
# ☆ $D13x - Key Menu 
# -- Author   : Dekita
# -- Version  : 1.2
# -- Level    : Easy / Normal
# -- Requires : $D13x Core v 1.4+
# -- Engine   : RPG Maker VX Ace.
#
#===============================================================================
# ☆ Import
#-------------------------------------------------------------------------------
$D13x={}if$D13x==nil
$D13x[:Key_Menu]=true
#===============================================================================
# ☆ Updates
#-------------------------------------------------------------------------------
# D /M /Y
# o4/o4/2o13 - Added Switch Restrictions, (all keys)
# 29/o3/2o13 - Compatibility, (Key Menu HUD)
#            - Bugfix, (scene re-trigger if long key press)
# 28/o3/2o13 - Finished,
# 27/o3/2o13 - Started
# 
#===============================================================================
# ☆ Introduction
#-------------------------------------------------------------------------------
# This script allows the use of other keys to trigger various scenes,
# Such as 'M' Key triggering the menu, 'S' Key Triggering the Status Screen,
# 'I' key Triggering Items. ect..
# And of course allows easy removal of the default Menu calling key.
# 
#===============================================================================
# ★☆★☆★☆★☆★☆★☆★☆★ TERMS AND CONDITIONS: ☆★☆★☆★☆★☆★☆★☆★☆★☆
#===============================================================================
# 1. You MUST give credit to "Dekita" !!
# 2. You are NOT allowed to repost this script.(or modified versions)
# 3. You are NOT allowed to convert this script.
# 4. You are NOT allowed to use this script for Commercial games.
# 5. ENJOY!
#
# "FINE PRINT" 
# By using this script you hereby agree to the above terms and conditions, 
#  if any violation of the above terms occurs "legal action" may be taken.
# Not understanding the above terms and conditions does NOT mean that 
#  they do not apply to you.
# If you wish to discuss the terms and conditions in further detail you can 
# contact me at http://dekitarpg.wordpress.com/
#
#===============================================================================
# ☆ Instructions
#-------------------------------------------------------------------------------
# Place Below " ▼ Materials " and Above " ▼ Main " in your script editor.
# 
#===============================================================================
# ☆ HELP
#-------------------------------------------------------------------------------
# For a list of possible key symbols check the help section of the 
# $D13x core script.
# 
#===============================================================================
module Key_Menu
#===============================================================================

  #=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  # ☆ Key Settings
  #-----------------------------------------------------------------------------
  # Make this true to disable the default Vx Ace menu key.
  Disable_Menu_Call = true
  
  # Menu Item = [ :KEY  , Switch ]
  Menu_Key    = [ :NONE , 0      ] # Triggers Menu   :NONE = no trigger
  Items_Key   = [ :I    , 0      ] # Triggers Items
  Skills_Key  = [ :M    , 0      ] # Triggers Skills
  Equips_Key  = [ :G    , 0      ] # Triggers Equip
  Status_Key  = [ :P    , 0      ] # Triggers Status
  Save_Key    = [ :N    , 0      ] # Triggers Save
  Pause_Key   = [ :O    , 0      ] # Triggers Game End
  
end                         #####################
                            # CUSTOMISATION END #
                            #####################
#☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★#
#                                                                               #
#                       http://dekitarpg.wordpress.com/                         #
#                                                                               #
#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆#
#===============================================================================#
# ARE YOU MODIFYING BEYOND THIS POINT? \.\.                                     #
# YES?\.\.                                                                      #
# OMG, REALLY? \|                                                               #
# WELL SLAP MY FACE AND CALL ME A DRAGONITE.\..\..                              #
# I REALLY DIDN'T THINK YOU HAD IT IN YOU.\..\..                                #
#===============================================================================#
class Scene_Map < Scene_Base
#===============================================================================
  #--------------------------------------------------------------------------
  # Alias List
  #--------------------------------------------------------------------------
  alias :update_my_KEYz  :update_scene
  alias :update_menu_key :update_call_menu
  #--------------------------------------------------------------------------
  # Update Scene Transition
  #--------------------------------------------------------------------------
  def update_scene
    update_my_KEYz
    update_de_keys
  end
  #--------------------------------------------------------------------------
  # Update Keys
  #--------------------------------------------------------------------------
  def update_de_keys
    return if scene_changing?
    update_call_pause    unless scene_changing?
    update_new_call_menu unless scene_changing?
    update__call_items   unless scene_changing?
    update__call_skills  unless scene_changing?
    update__call_equips  unless scene_changing?
    update__call_status  unless scene_changing?
    update__call_save    unless scene_changing?
  end
  #--------------------------------------------------------------------------
  # Determine if Pause is being triggered
  #--------------------------------------------------------------------------
  def update_call_pause
    return unless !$game_map.interpreter.running?
    return unless !$game_player.moving?
    if (Key_Menu::Pause_Key[1] != 0) 
      return unless $game_switches[Key_Menu::Pause_Key[1]]
    end
    return unless Keys.trigger?(Keys::Key[Key_Menu::Pause_Key[0]])
    SceneManager.call(Scene_End)
  end
  #--------------------------------------------------------------------------
  # Determine if Menu is Called due to Cancel Button
  #--------------------------------------------------------------------------
  def update_call_menu
    return if Key_Menu::Disable_Menu_Call
    update_menu_key
  end
  #--------------------------------------------------------------------------
  # Determine if Menu is Called due to New Key
  #--------------------------------------------------------------------------
  def update_new_call_menu
    return unless Key_Menu::Disable_Menu_Call
    return unless !$game_map.interpreter.running?
    return unless !$game_player.moving?
    if (Key_Menu::Menu_Key[1] != 0) 
      return unless $game_switches[Key_Menu::Menu_Key[1]]
    end
    return unless Keys.trigger?(Keys::Key[Key_Menu::Menu_Key[0]])
    call_menu
  end
  #--------------------------------------------------------------------------
  # Determine if Menu is Called due to New Key
  #--------------------------------------------------------------------------
  def update__call_items
    return unless !$game_map.interpreter.running?
    return unless !$game_player.moving?
    if (Key_Menu::Items_Key[1] != 0) 
      return unless $game_switches[Key_Menu::Items_Key[1]]
    end
    return unless Keys.trigger?(Keys::Key[Key_Menu::Items_Key[0]])
    SceneManager.call(Scene_Item)
  end
  #--------------------------------------------------------------------------
  # Determine if Menu is Called due to New Key
  #--------------------------------------------------------------------------
  def update__call_skills
    return unless !$game_map.interpreter.running?
    return unless !$game_player.moving?
    if (Key_Menu::Skills_Key[1] != 0) 
      return unless $game_switches[Key_Menu::Skills_Key[1]]
    end
    return unless Keys.trigger?(Keys::Key[Key_Menu::Skills_Key[0]])
    SceneManager.call(Scene_Skill)
  end
  #--------------------------------------------------------------------------
  # Determine if Menu is Called due to New Key
  #--------------------------------------------------------------------------
  def update__call_equips
    return unless !$game_map.interpreter.running?
    return unless !$game_player.moving?
    if (Key_Menu::Equips_Key[1] != 0) 
      return unless $game_switches[Key_Menu::Equips_Key[1]]
    end
    return unless Keys.trigger?(Keys::Key[Key_Menu::Equips_Key[0]])
    SceneManager.call(Scene_Equip)
  end
  #--------------------------------------------------------------------------
  # Determine if Menu is Called due to New Key
  #--------------------------------------------------------------------------
  def update__call_status
    return unless !$game_map.interpreter.running?
    return unless !$game_player.moving?
    if (Key_Menu::Status_Key[1] != 0) 
      return unless $game_switches[Key_Menu::Status_Key[1]]
    end
    return unless Keys.trigger?(Keys::Key[Key_Menu::Status_Key[0]])
    SceneManager.call(Scene_Status)
  end
  #--------------------------------------------------------------------------
  # Determine if Menu is Called due to New Key
  #--------------------------------------------------------------------------
  def update__call_save
    return unless !$game_map.interpreter.running?
    return unless !$game_player.moving?
    if (Key_Menu::Save_Key[1] != 0) 
      return unless $game_switches[Key_Menu::Save_Key[1]]
    end
    return unless Keys.trigger?(Keys::Key[Key_Menu::Save_Key[0]])
    SceneManager.call(Scene_Save)
  end
  
end

#==============================================================================#
#                      http://dekitarpg.wordpress.com/                         #
#==============================================================================#
end